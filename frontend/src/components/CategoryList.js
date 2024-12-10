import Category from './Category.js';
import NewCategory from './NewCategory.js';

function CategoryList(props) {
    const { asset, categories = [], setCategories } = props; // Fallback to an empty array

    return (
        <div className='category-list'>
            <NewCategory categories={categories} setCategories={setCategories} asset={asset} />

            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Category Type</th>
                        <th>Category Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Category
                                key={category.id}
                                category={category}
                                categories={categories}
                                setCategories={setCategories}
                                asset={asset}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                No categories available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryList;
