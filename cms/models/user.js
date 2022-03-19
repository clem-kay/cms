'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserAccount,{
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      });
      
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    DateOfBirth:DataTypes.DATEONLY,
    maritalStatus:DataTypes.STRING,
    phoneNumber:DataTypes.INTEGER,
    whatsapp:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};