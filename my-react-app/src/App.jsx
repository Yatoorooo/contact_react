import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function ContactsTable({ contacts, onDelete }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Ім'я</th>
                <th>Прізвище</th>
                <th>Телефон</th>
                <th>Видалити</th>
            </tr>
            </thead>
            <tbody>
            {contacts.map(contact => (
                <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.username}</td>
                    <td>{contact.phone}</td>
                    <td><button onClick={() => onDelete(contact.id)}>Видалити</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function ContactForm({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, username, phone });
        setName('');
        setUsername('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Прізвище" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button type="submit">Зберегти</button>
            <button type="button" onClick={onCancel}>Скасувати</button>
        </form>
    );
}

function App() {
    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    const handleDelete = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const handleSave = (newContact) => {
        setContacts([...contacts, newContact]);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="app">
            <h1>Список контактів</h1>
            <ContactsTable contacts={contacts} onDelete={handleDelete} />
            {!showForm && <button onClick={() => setShowForm(true)}>Додати контакт</button>}
            {showForm && <ContactForm onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
}

export default App
