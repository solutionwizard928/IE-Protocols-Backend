module.exports = (sequelize, Sequelize) => {
    const Ecosystem = sequelize.define("ecosystem", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      verified: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      about: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
    });
    Ecosystem.associate = function (models) {
        Ecosystem.hasMany(models.project);
        Ecosystem.hasMany(models.user);
    };
    return Ecosystem;
  };