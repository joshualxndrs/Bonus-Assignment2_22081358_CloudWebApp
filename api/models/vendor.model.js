module.exports = (sequelize, Sequelize) => {
    const Vendor = sequelize.define("vendor", {
        vendor_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vendor_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vendor_address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        asset_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'assets', // Foreign key references contacts table
                key: 'id',
            },
            onDelete: "CASCADE",
        },
    });

    return Vendor;
};
