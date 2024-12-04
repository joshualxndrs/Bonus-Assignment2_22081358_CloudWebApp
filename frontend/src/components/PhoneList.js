import Phone from './Phone.js';
import NewPhone from './NewPhone.js';

function PhoneList(props) {
    const { contact, phones = [], setPhones } = props; // Fallback to an empty array

    return (
        <div className='phone-list'>
            <NewPhone phones={phones} setPhones={setPhones} contact={contact} />

            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Phone Type</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {phones.length > 0 ? (
                        phones.map((phone) => (
                            <Phone
                                key={phone.id}
                                phone={phone}
                                phones={phones}
                                setPhones={setPhones}
                                contact={contact}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                No phones available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PhoneList;
