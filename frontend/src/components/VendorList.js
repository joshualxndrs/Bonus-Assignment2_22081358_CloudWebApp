import Vendor from "./Vendor.js";
import NewVendor from "./NewVendor.js";

function VendorList(props) {
    const { asset, vendors, setVendors } = props;

    return (
        <div
            className="vendor-list"
            onClick={(e) => e.stopPropagation()} // Stop click events from propagating to parent
        >
            <NewVendor
                vendors={vendors}
                setVendors={setVendors}
                asset={asset}
            />

            <table>
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.length > 0 ? (
                        vendors.map((vendor) => (
                            <Vendor
                                key={vendor.vendor_id}
                                vendor={vendor}
                                vendors={vendors}
                                setVendors={setVendors}
                                asset={asset}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                No vendors available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default VendorList;
