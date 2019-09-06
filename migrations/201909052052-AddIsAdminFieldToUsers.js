"use strict";

const columnAndTypes = [
  {
    name: "is_Admin",
    type: Sequelize => {
      return {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      };
    }
  }
];

// Dont change it
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      columnAndTypes.map(column => {
        return queryInterface.addColumn(
          "users",
          column.name,
          column.type(Sequelize)
        );
      })
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(
      columnAndTypes.map(column => {
        return queryInterface.removeColumn("users", column.name);
      })
    );
  }
};
