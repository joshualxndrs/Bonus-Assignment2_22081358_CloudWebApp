const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Companies = db.companies; // Include companies model
const Op = db.Sequelize.Op;

exports.calculate = (req, res) => {
    Contacts.count().then(totalContacts => {
        Phones.count().then(totalPhones => {
            Companies.count().then(totalCompanies => { // Count companies
                Contacts.max('updatedAt').then(lastUpdatedContact => {
                    Contacts.min('createdAt').then(oldestContact => {
                        res.send({
                            totalContacts: totalContacts,
                            totalPhones: totalPhones,
                            totalCompanies: totalCompanies, // Include total companies
                            lastUpdatedContact: lastUpdatedContact,
                            oldestContact: oldestContact
                        });
                    });
                });
            });
        });
    });
};
