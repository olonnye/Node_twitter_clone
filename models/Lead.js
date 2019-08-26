"use strict";
module.exports = (Sequelize, DataTypes) => {
  let Lead = sequelize.define("Lead", {
    id: {
      type: DataTypes.UUID,
      defaultValues: DataTypes.UUIDV4,

      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Lead;
};
