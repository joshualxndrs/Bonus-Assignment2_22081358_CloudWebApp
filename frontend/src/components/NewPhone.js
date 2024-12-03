import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [PhoneNumber, set_phone_number] = useState('');
    const [PhoneType, set_phone_type] = useState('family');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PhoneNumber,
                PhoneType
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        set_phone_number('');
        set_phone_type('family');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
             <select name="phone-type" onChange={(e) => set_phone_type(e.target.value)} value={PhoneType}>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="work">Work</option>
                <option value="others">Others</option>
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => set_phone_number(e.target.value)} value={PhoneNumber}/>
            <button className='button green' type='submit'>Add {contact.name} Phone</button>
        </form>
	);
}

export default NewPhone;