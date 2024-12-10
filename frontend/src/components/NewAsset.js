import { useState } from 'react';

function NewAsset(props) {
    const {assets, setAssets} = props;
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    async function createAsset(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/assets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description
            })
        });

        const data = await response.json();

        if (data.id) {
            setAssets([...assets, data]);
        }

        setName('');
        setDescription('');
    }

	return (
        <form className='new-asset' onSubmit={createAsset}>
            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>
            <input type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description}/>
            <button className='button green' type='submit'>Create Asset</button>
        </form>
	);
}

export default NewAsset;