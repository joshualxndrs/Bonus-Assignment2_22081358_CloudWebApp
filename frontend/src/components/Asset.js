import { useState, useEffect } from 'react';
import CategoryList from './CategoryList.js';
import VendorList from './VendorList.js';

function Asset(props) {
    const { asset, assets, setAssets } = props;
    const [expanded, setExpanded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);

    // Fetch data for categories and Vendors
    useEffect(() => {
        // Fetch categories for the Asset
        fetch(`http://localhost/api/assets/${asset.id}/categories`)
            .then((response) => response.json())
            .then((data) => setCategories(data || [])) // Fallback to empty array
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setCategories([]); // Set to empty array on error
            });

        // Fetch Vendors for the asset
        fetch(`http://localhost/api/assets/${asset.id}/vendors`)
            .then((response) => response.json())
            .then((data) => setVendors(data || [])) // Fallback to empty array
            .catch((error) => {
                console.error('Error fetching vendors:', error);
                setVendors([]); // Set to empty array on error
            });
    }, [asset.id]);

    // Handle asset deletion
    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch(`http://localhost/api/assets/${asset.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const newAssets = assets.filter((c) => c.id !== asset.id);
            setAssets(newAssets);
        } else {
            console.error('Error deleting asset');
        }
    }

    return (
        <div key={asset.id} className="asset" onClick={() => setExpanded(!expanded)}>
            <div className="asset-title">
                <h3>{asset.name}</h3>
                <p>{asset.description}</p>
            </div>

            <div className="asset-action">
                <button className="button red" onClick={doDelete}>
                    Delete Asset
                </button>
            </div>

            {expanded && (
                <div>
                    <hr />
                    <CategoryList categories={categories} setCategories={setCategories} asset={asset} />
                    <hr />
                    <VendorList vendors={vendors} setVendors={setVendors} asset={asset} />
                </div>
            )}
        </div>
    );
}

export default Asset;
