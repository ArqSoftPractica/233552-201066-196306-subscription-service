const Sequelize = require("sequelize");

const SubscribedUser = (schema, types) => {
    return schema.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};

module.exports = SubscribedUser;
