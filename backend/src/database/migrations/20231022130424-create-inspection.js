"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inspections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reportNumber: {
        type: Sequelize.STRING
      },
      inspectionDate: {
        type: Sequelize.DATE
      },
      reportState: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      timeWeight: {
        type: Sequelize.INTEGER
      },
      placarableHmVehInsp: {
        type: Sequelize.BOOLEAN
      },
      hmInspection: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable("inspection_vehicles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inspectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "inspections",
          key: "id"
        }
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "vehicles",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable("inspection_violations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inspectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "inspections",
          key: "id"
        }
      },
      violationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "violations",
          key: "id"
        }
      },
      description: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      oos: {
        type: Sequelize.BOOLEAN,
        set(value) {
          if (value === "N") return false;
          if (value === "Y") return true;
        }
      },
      timeSeverityWeight: {
        type: Sequelize.INTEGER
      },
      convictedOfDifCharge: {
        type: Sequelize.BOOLEAN,
        set(value) {
          if (value === "N") return false;
          if (value === "Y") return true;
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inspection_violations");
    await queryInterface.dropTable("inspection_vehicles");
    await queryInterface.dropTable("inspections");
  }
};
