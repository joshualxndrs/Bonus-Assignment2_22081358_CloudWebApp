module.exports = app => {
    const categories = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
  
    router.post("/assets/:assetId/categories", categories.create);
  
    router.get("/assets/:assetId/categories", categories.findAll);
  
    router.get("/assets/:assetId/categories/:categoryId", categories.findOne);
  
    router.put("/assets/:assetId/categories/:categoryId", categories.update);
  
    router.delete("/assets/:assetId/categories/:categoryId", categories.delete);
  
    app.use('/api', router);
};