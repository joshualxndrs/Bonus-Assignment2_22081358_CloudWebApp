const db = require("../models");
const Categories = db.categories;
const Assets = db.assets;
const Vendors = db.vendors; 
const Op = db.Sequelize.Op;

exports.calculate = (req, res) => {
    Assets.count().then(totalAssets => {
        Categories.count().then(totalCategories => {
            Vendors.count().then(totalVendors => { 
                Assets.max('updatedAt').then(lastUpdatedAsset => {
                    Assets.min('createdAt').then(oldestAsset => {
                        res.send({
                            totalAssets: totalAssets,
                            totalCategories: totalCategories,
                            totalVendors: totalVendors, 
                            lastUpdatedAsset: lastUpdatedAsset,
                            oldestAsset: oldestAsset
                        });
                    });
                });
            });
        });
    });
};
