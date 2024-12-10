const db = require("../models");
const Vendors = db.vendors;

// Add a new vendor linked to a asset
exports.create = (req, res) => {
    const vendor = {
        vendor_name: req.body.vendor_name,
        vendor_address: req.body.vendor_address,
        asset_id: parseInt(req.params.assetId), // Foreign key to associate the vendor with a asset
    };

    Vendors.create(vendor)
        .then((data) => {
            res.send(data); // Return the created record
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Failed to add the vendor.",
            });
        });
};

// Fetch all vendors tied to a specific asset
exports.findAll = (req, res) => {
    Vendors.findAll({
        where: {
            asset_id: parseInt(req.params.assetId),
        },
    })
        .then((data) => {
            res.send(data); // Send the list of vendors
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Unable to retrieve vendors.",
            });
        });
};

// Fetch details of a specific vendor under a asset
exports.findOne = (req, res) => {
    Vendors.findOne({
        where: {
            asset_id: parseInt(req.params.assetId),
            vendor_id: parseInt(req.params.vendorId),
        },
    })
        .then((data) => {
            if (data) res.send(data); // Send the specific vendor data if found
            else
                res.status(404).send({
                    message: `vendor not found with id=${req.params.vendorId}.`,
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error retrieving the vendor with id=${req.params.vendorId}.`,
            });
        });
};

// Modify an existing vendor under a asset
exports.update = (req, res) => {
    const vendorId = parseInt(req.params.vendorId);

    Vendors.update(req.body, {
        where: {
            vendor_id: vendorId,
            asset_id: parseInt(req.params.assetId),
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "The vendor details were successfully updated.",
                });
            } else {
                res.send({
                    message: `Unable to update the vendor with id=${vendorId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error occurred while updating the vendor with id=${vendorId}.`,
            });
        });
};

// Remove a vendor tied to a asset
exports.delete = (req, res) => {
    const vendorId = parseInt(req.params.vendorId);

    Vendors.destroy({
        where: {
            vendor_id: vendorId,
            asset_id: parseInt(req.params.assetId),
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "The vendor has been deleted.",
                });
            } else {
                res.send({
                    message: `Unable to delete the vendor with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error occurred while deleting the vendor with id=${id}.`,
            });
        });
};
