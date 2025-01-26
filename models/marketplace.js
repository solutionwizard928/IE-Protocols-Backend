const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Marketplace = sequelize.define("marketplace", {
        seller: {
            allowNull: false,
            type: DataTypes.STRING
        },
        collection: {
            allowNull: false,
            type: DataTypes.STRING
        },
        tokenId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(65, 10)
        },
        startTime: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        duration: {
            allowNull: false,
            type: DataTypes.BIGINT
        }
    });

    return Marketplace;
};