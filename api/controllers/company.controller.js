const db = require("../models");
const Companies = db.companies;

// Add a new company linked to a contact
exports.create = (req, res) => {
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contact_id: parseInt(req.params.contactId), // Foreign key to associate the company with a contact
    };

    Companies.create(company)
        .then((data) => {
            res.send(data); // Return the created record
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Failed to add the company.",
            });
        });
};

// Fetch all companies tied to a specific contact
exports.findAll = (req, res) => {
    Companies.findAll({
        where: {
            contact_id: parseInt(req.params.contactId),
        },
    })
        .then((data) => {
            res.send(data); // Send the list of companies
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Unable to retrieve companies.",
            });
        });
};

// Fetch details of a specific company under a contact
exports.findOne = (req, res) => {
    Companies.findOne({
        where: {
            contact_id: parseInt(req.params.contactId),
            company_id: parseInt(req.params.companyId),
        },
    })
        .then((data) => {
            if (data) res.send(data); // Send the specific company data if found
            else
                res.status(404).send({
                    message: `Company not found with id=${req.params.companyId}.`,
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error retrieving the company with id=${req.params.companyId}.`,
            });
        });
};

// Modify an existing company under a contact
exports.update = (req, res) => {
    const companyId = parseInt(req.params.companyId);

    Companies.update(req.body, {
        where: {
            company_id: companyId,
            contact_id: parseInt(req.params.contactId),
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "The company details were successfully updated.",
                });
            } else {
                res.send({
                    message: `Unable to update the company with id=${companyId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error occurred while updating the company with id=${companyId}.`,
            });
        });
};

// Remove a company tied to a contact
exports.delete = (req, res) => {
    const companyId = parseInt(req.params.companyId);

    Companies.destroy({
        where: {
            company_id: companyId,
            contact_id: parseInt(req.params.contactId),
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "The company has been deleted.",
                });
            } else {
                res.send({
                    message: `Unable to delete the company with id=${companyId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error occurred while deleting the company with id=${companyId}.`,
            });
        });
};
