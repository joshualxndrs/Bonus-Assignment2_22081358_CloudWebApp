import { useState, useEffect } from 'react';
import PhoneList from './PhoneList.js';
import CompanyList from './CompanyList.js';

function Contact(props) {
    const { contact, contacts, setContacts } = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [companies, setCompanies] = useState([]);

    // Fetch data for phones and companies
    useEffect(() => {
        // Fetch phones for the contact
        fetch(`http://localhost/api/contacts/${contact.id}/phones`)
            .then((response) => response.json())
            .then((data) => setPhones(data || [])) // Fallback to empty array
            .catch((error) => {
                console.error('Error fetching phones:', error);
                setPhones([]); // Set to empty array on error
            });

        // Fetch companies for the contact
        fetch(`http://localhost/api/contacts/${contact.id}/companies`)
            .then((response) => response.json())
            .then((data) => setCompanies(data || [])) // Fallback to empty array
            .catch((error) => {
                console.error('Error fetching companies:', error);
                setCompanies([]); // Set to empty array on error
            });
    }, [contact.id]);

    // Handle contact deletion
    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const newContacts = contacts.filter((c) => c.id !== contact.id);
            setContacts(newContacts);
        } else {
            console.error('Error deleting contact');
        }
    }

    return (
        <div key={contact.id} className="contact" onClick={() => setExpanded(!expanded)}>
            <div className="contact-title">
                <h3>{contact.name}</h3>
                <p>{contact.address}</p>
            </div>

            <div className="contact-action">
                <button className="button red" onClick={doDelete}>
                    Delete Contact
                </button>
            </div>

            {expanded && (
                <div>
                    <hr />
                    <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
                    <hr />
                    <CompanyList companies={companies} setCompanies={setCompanies} contact={contact} />
                </div>
            )}
        </div>
    );
}

export default Contact;
