import { useState } from "react";

function Vendor(props) {
    const { vendor, vendors, setVendors, asset } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [vendorName, setvendorName] = useState(vendor.vendor_name);
    const [vendorAddress, setvendorAddress] = useState(vendor.vendor_address);

    async function deletevendor() {
        const response = await fetch(
            `http://localhost/api/assets/${asset.id}/vendors/${vendor.id}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            const updatedVendors = vendors.filter((c) => c.vendor_id !== vendor.vendor_id);
            setVendors([...updatedVendors]);
        }
    }

    async function updatevendor(e) {
        e.preventDefault();

        const response = await fetch(
            `http://localhost/api/assets/${asset.id}/vendors/${vendor.vendor_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vendor_name: vendorName,
                    vendor_address: vendorAddress,
                }),
            }
        );

        if (response.ok) {
            const updatedvendor = await response.json();
            const updatedVendors = vendors.map((c) =>
                c.vendor_id === vendor.vendor_id ? updatedvendor : c
            );
            setVendors([...updatedVendors]);
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
                            value={vendorName}
                            onChange={(e) => setvendorName(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent propagation for input
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={vendorAddress}
                            onChange={(e) => setvendorAddress(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent propagation for input
                        />
                    </td>
                    <td>
                        <button
                            className="button green"
                            onClick={(e) => {
                                e.stopPropagation();
                                updatevendor(e);
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
                    <td>{vendor.vendor_name}</td>
                    <td>{vendor.vendor_address}</td>
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
                                deletevendor();
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

export default Vendor;
