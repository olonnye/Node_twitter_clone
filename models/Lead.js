"use strict";
module.exports = (sequelize, DataTypes) => {
  var Lead = sequelize.define("Lead", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter an email" }
      }
    }
  });

  return Lead;
};
