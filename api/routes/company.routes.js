module.exports = (app) => {
    const companies = require("../controllers/company.controller.js");

    var router = require("express").Router();

    // Create a new company associated with a contact
    router.post("/contacts/:contactId/companies", companies.create);

    // Retrieve all companies associated with a contact
    router.get("/contacts/:contactId/companies", companies.findAll);

    // Retrieve a single company by ID associated with a contact
    router.get("/contacts/:contactId/companies/:companyId", companies.findOne);

    // Update a company by ID associated with a contact
    router.put("/contacts/:contactId/companies/:companyId", companies.update);

    // Delete a company by ID associated with a contact
    router.delete("/contacts/:contactId/companies/:companyId", companies.delete);

    app.use("/api", router);
};
