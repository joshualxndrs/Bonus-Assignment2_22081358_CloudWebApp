import { useState } from "react";

function NewVendor(props) {
    const { asset, vendors, setVendors } = props;
    const [newVendorName, setNewVendorName] = useState("");
    const [newVendorAddress, setNewVendorAddress] = useState("");

    async function addVendor(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost/api/assets/${asset.id}/vendors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                vendor_name: newVendorName,
                vendor_address: newVendorAddress,
            }),
        });

        if (response.ok) {
            const newVendor = await response.json();
            setVendors([...vendors, newVendor]);
            setNewVendorName("");
            setNewVendorAddress("");
        }
    }

    return (
        <form onSubmit={addVendor} className="new-vendor">
            <input
                type="text"
                placeholder="Vendor Name"
                value={newVendorName}
                onChange={(e) => setNewVendorName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Vendor Address"
                value={newVendorAddress}
                onChange={(e) => setNewVendorAddress(e.target.value)}
            />
            <button type="submit" className="button green">
                Add {asset.name} Vendor
            </button>
        </form>
    );
}

export default NewVendor;
