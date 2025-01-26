const { NONCE } = require("../config");
const { toCheckSumAddress } = require("../helper");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true
    },
    wallet: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    verifiedAsCreator: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    verifiedAsInvestor: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    fromUS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
    },
    suspend: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    nonce: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });
  User.associate = function (models) {
    User.belongsTo(models.ecosystem);
    User.hasMany(models.project);
  };

  User.hasAccount = async (wallet) => {
    let user = await User.findOne({where: {wallet: toCheckSumAddress(wallet)}})
    return user !== null;
  }

  User.prototype.generate = async () => {
    user = this;
  }

  User.getNonce = (req, res, next) => {
    return res.send({nonce: NONCE})
  }


  return User;
};