module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        PhoneType: { // Update the name to phone_type
            type: Sequelize.STRING
        },
        PhoneNumber: { // Update the name to phone_number
            type: Sequelize.STRING
        },
        contactId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts',
                key: 'id',
            }
        }
    });

    return Phone;
};
