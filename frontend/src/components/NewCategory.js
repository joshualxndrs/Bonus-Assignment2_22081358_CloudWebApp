import { useState } from 'react';

function NewCategory(props) {
    const {asset, categories, setCategories} = props;
    const [CategoryNumber, set_category_number] = useState('');
    const [CategoryType, set_category_type] = useState('Office');

    async function createCategory(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/assets/' + asset.id + '/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CategoryNumber,
                CategoryType
            })
        });

        const data = await response.json();

        if (data.id) {
            setCategories([...categories, data]);
        }

        set_category_number('');
        set_category_type('Office');
    }

	return (
        <form onSubmit={createCategory} onClick={(e) => e.stopPropagation()} className='new-category'>
             <select name="category-type" onChange={(e) => set_category_type(e.target.value)} value={CategoryType}>
                <option value="office">Office</option>
                <option value="house">House</option>
                <option value="school">School</option>
                <option value="kitchen">Kitchen</option>
            </select>
            <input type='text' placeholder='Category Number' onChange={(e) => set_category_number(e.target.value)} value={CategoryNumber}/>
            <button className='button green' type='submit'>Add {asset.name} Category</button>
        </form>
	);
}

export default NewCategory;