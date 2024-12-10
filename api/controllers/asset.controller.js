const db = require("../models");
const Assets = db.assets;
const Categories = db.categories;
const Op = db.Sequelize.Op;

// Create asset
exports.create = (req, res) => {
    
    const asset = {
        name: req.body.name,
        description: req.body.description,
    };

    Assets.create(asset)
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

// Get all assets
exports.findAll = (req, res) => {
    Assets.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one asset by id
exports.findOne = (req, res) => {
    const id = req.params.assetId;

    Assets.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving asset with id=" + id
            });
        }
    );
};

// Update one asset by id
exports.update = (req, res) => {
    const id = req.params.assetId;

    Assets.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Asset was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Asset`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Asset with id=" + id
        });
    });
};

// Delete one asset by id
exports.delete = (req, res) => {
    const id = parseInt(req.params.assetId);

    Categories.destroy({
        where: { assetId: id }
    })
    .then(num => {
        Assets.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Asset was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Asset`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Asset with id=" + id
            });
        });
    });
};