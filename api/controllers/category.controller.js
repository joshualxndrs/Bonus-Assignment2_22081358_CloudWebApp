const db = require("../models");
const Categories = db.categories;
const Op = db.Sequelize.Op;

// Create category
exports.create = (req, res) => {
    const category = {
        CategoryType: req.body.CategoryType,
        CategoryNumber: req.body.CategoryNumber,
        assetId: parseInt(req.params.assetId)
    };

    Categories.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        });
};

// Get all categories
exports.findAll = (req, res) => {

    Categories.findAll({
        where: {
            assetId: parseInt(req.params.assetId)
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one category by id
exports.findOne = (req, res) => {
    Categories.findOne({
        where: {
            assetId: req.params.assetId,
            id: req.params.categoryId
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Update one category by id
exports.update = (req, res) => {
    const id = req.params.categoryId;

    Categories.update(req.body, {
        where: { id: id, assetId: req.params.assetId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

// Delete one category by id
exports.delete = (req, res) => {
    const id = req.params.categoryId;

    Categories.destroy({
        where: { id: id, assetId: req.params.assetId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};