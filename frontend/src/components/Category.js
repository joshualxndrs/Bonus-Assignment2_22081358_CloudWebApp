function Category(props) {
    const {asset, category, categories, setCategories} = props;

    async function deleteCategory() {
        const response = await fetch('http://localhost/api/assets/' + asset.id + '/categories/' + category.id, {
            method: 'DELETE',
        });

        let newCategories = categories.filter((p) => {
            return p.id !== category.id;
        });

        setCategories(newCategories);
    }

	return (
		<tr>
            <td>{ category.CategoryType }</td>
            <td>{ category.CategoryNumber }</td>
            <td style={
                {
                    width: '14px',
                }
            }><button className="button red" onClick={deleteCategory}>Delete</button></td>
        </tr>
	);
}

export default Category;
