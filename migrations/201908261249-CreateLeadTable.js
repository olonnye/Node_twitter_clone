"use strict";
module.exports = {
  // creating new table from leads
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Leads", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  // deleting tables
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Leads");
  }
};
