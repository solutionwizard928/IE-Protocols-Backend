
const progressEnum = [
    {
        key: 0,
        value: "PENDING"
    },
    {
        key: 1,
        value: "INSTALLING"
    },
    {
        key: 2,
        value: "UPCOMING"
    },
    {
        key: 3,
        value: "SUSPEND"
    },
    {
        key: 10,
        value: "DONE"
    },
]

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        projectName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        progress: {
            type: Sequelize.INTEGER,
            defaultValue: progressEnum[0].key
        },
        modelSN: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        forOnlyUS: {
            type: Sequelize.BOOLEAN,
        },
        brand: {
            type: Sequelize.STRING,
            unique: true
        },
        about: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hasShare: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        shareName: {
            type: Sequelize.STRING,
            unique: true
        },
        shareSymbol: {
            type: Sequelize.STRING,
        },
        maxTotalSupply: {
            type: Sequelize.INTEGER,
        },
        mintPrice: {
            type: Sequelize.INTEGER,
        },
        mnpw: {
            type: Sequelize.INTEGER,
        },
        mnpt: {
            type: Sequelize.INTEGER,
        },
        endTime: {
            type: Sequelize.STRING,
        },
        paymentToken: {
            type: Sequelize.STRING,
        },
        stopSellingShare: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        modelUploaded: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        canWithdraw: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });


    Project.associate = function (models) {
        Project.belongsTo(models.user);
        Project.belongsTo(models.category)
        Project.belongsTo(models.ecosystem)
    };
    return Project;
};