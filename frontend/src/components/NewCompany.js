import { useState } from "react";

function NewCompany(props) {
    const { contact, companies, setCompanies } = props;
    const [newCompanyName, setNewCompanyName] = useState("");
    const [newCompanyAddress, setNewCompanyAddress] = useState("");

    async function addCompany(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_name: newCompanyName,
                company_address: newCompanyAddress,
            }),
        });

        if (response.ok) {
            const newCompany = await response.json();
            setCompanies([...companies, newCompany]);
            setNewCompanyName("");
            setNewCompanyAddress("");
        }
    }

    return (
        <form onSubmit={addCompany} className="new-company">
            <input
                type="text"
                placeholder="Company Name"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company Address"
                value={newCompanyAddress}
                onChange={(e) => setNewCompanyAddress(e.target.value)}
            />
            <button type="submit" className="button green">
                Add {contact.name} Company
            </button>
        </form>
    );
}

export default NewCompany;
