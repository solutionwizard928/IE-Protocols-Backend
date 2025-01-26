'use strict';
const uuid = require('uuid');
const { getTimeNowInTimestamp } = require('../helper');
const { INTELL } = require('../config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("projects", [
      {
        projectName: "Milke Consumer dsfdsfasdf AI 1",
        modelSN: uuid.v4(),
        forOnlyUS: false,
        brand: "https://brand.... 1",
        about: "This model is for Milke Consumer Prediction AI 1",
        hasShare: true,
        shareName: "Milke Consumer Prediction AI 1",
        shareSymbol: "MCPA",
        maxTotalSupply: 1000,
        mintPrice: 10000,
        mnpw: 10,
        mnpt: 10,
        endTime: (getTimeNowInTimestamp() + (10 * 24 * 60 * 60)).toString(),
        paymentToken: INTELL,
        modelUploaded: false,
        categoryId: 1
      },
      {
        projectName: "Milke Consumer Prediction AI 2",
        modelSN: uuid.v4(),
        forOnlyUS: false,
        brand: "https://brand....2",
        about: "This model is for Milke Consumer Prediction AI 2",
        hasShare: true,
        shareName: "Milke Consumer Prediction AI 2",
        shareSymbol: "MCPA",
        maxTotalSupply: 1000,
        mintPrice: 10000,
        mnpw: 10,
        mnpt: 10,
        endTime: getTimeNowInTimestamp().toString(),
        paymentToken: INTELL,
        modelUploaded: false,
        categoryId: 2
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
