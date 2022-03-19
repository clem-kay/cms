'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAccount.belongsTo(models.User,{
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      });

      UserAccount.belongsTo(models.Role, {
        foreignKey: 'RoleId',
        onDelete: 'SET NULL'
      });
    }
  }
  UserAccount.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    blocked:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserAccount',
  });
  return UserAccount;
};