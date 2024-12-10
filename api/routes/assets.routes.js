module.exports = app => {
    const assets = require("../controllers/asset.controller.js");
  
    var router = require("express").Router();
  
    router.post("/assets/", assets.create);
  
    router.get("/assets/", assets.findAll);
  
    router.get("/assets/:assetId", assets.findOne);
  
    router.put("/assets/:assetId", assets.update);
  
    router.delete("/assets/:assetId", assets.delete);
  
    app.use('/api', router);
};