import Company from "./Company.js";
import NewCompany from "./NewCompany.js";

function CompanyList(props) {
    const { contact, companies, setCompanies } = props;

    return (
        <div
            className="company-list"
            onClick={(e) => e.stopPropagation()} // Stop click events from propagating to parent
        >
            <NewCompany
                companies={companies}
                setCompanies={setCompanies}
                contact={contact}
            />

            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length > 0 ? (
                        companies.map((company) => (
                            <Company
                                key={company.company_id}
                                company={company}
                                companies={companies}
                                setCompanies={setCompanies}
                                contact={contact}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                No companies available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;
