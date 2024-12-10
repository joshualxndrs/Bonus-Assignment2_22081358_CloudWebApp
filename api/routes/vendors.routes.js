module.exports = (app) => {
    const vendors = require("../controllers/vendor.controller.js");

    var router = require("express").Router();

    // Create a new vendor associated with a contact
    router.post("/assets/:assetId/vendors", vendors.create);

    // Retrieve all vendors associated with a contact
    router.get("/assets/:assetId/vendors", vendors.findAll);

    // Retrieve a single vendor by ID associated with a contact
    router.get("/assets/:assetId/vendors/:vendorId", vendors.findOne);

    // Update a vendor by ID associated with a contact
    router.put("/assets/:assetId/vendors/:vendorId", vendors.update);

    // Delete a vendor by ID associated with a contact
    router.delete("/assets/:assetId/vendors/:vendorId", vendors.delete);

    app.use("/api", router);
};
