module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        CategoryType: { // Update the name to phone_type
            type: Sequelize.STRING
        },
        CategoryNumber: { // Update the name to phone_number
            type: Sequelize.STRING
        },
        assetId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'assets',
                key: 'id',
            }
        }
    });

    return Category;
};
