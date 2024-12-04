import { useState } from "react";

function Company(props) {
    const { company, companies, setCompanies, contact } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [companyName, setCompanyName] = useState(company.company_name);
    const [companyAddress, setCompanyAddress] = useState(company.company_address);

    async function deleteCompany() {
        const response = await fetch(
            `http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            const updatedCompanies = companies.filter((c) => c.company_id !== company.company_id);
            setCompanies([...updatedCompanies]);
        }
    }

    async function updateCompany(e) {
        e.preventDefault();

        const response = await fetch(
            `http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_name: companyName,
                    company_address: companyAddress,
                }),
            }
        );

        if (response.ok) {
            const updatedCompany = await response.json();
            const updatedCompanies = companies.map((c) =>
                c.company_id === company.company_id ? updatedCompany : c
            );
            setCompanies([...updatedCompanies]);
            setIsEditing(false);
        }
    }

    return (
        <tr
            onClick={(e) => e.stopPropagation()} // Prevent click propagation for the row
        >
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent propagation for input
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent propagation for input
                        />
                    </td>
                    <td>
                        <button
                            className="button green"
                            onClick={(e) => {
                                e.stopPropagation();
                                updateCompany(e);
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="button red"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(false);
                            }}
                        >
                            Cancel
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{company.company_name}</td>
                    <td>{company.company_address}</td>
                    <td>
                        <button
                            className="button blue"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="button red"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteCompany();
                            }}
                        >
                            Delete
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Company;
