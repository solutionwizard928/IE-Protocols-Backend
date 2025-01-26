'use strict';

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

    queryInterface.bulkInsert('ecosystems', [
      {
        name: "Other",
        verified: false,
        logo: "https://logo",
        about: "No ecosystem"
      },
      {
        name: "The Intelligence Exchange",
        verified: true,
        logo: "https://logo",
        about: "No ecosystem"
      },
      {
        name: "The French Fry AI",
        verified: false,
        logo: "https://logo",
        about: "No ecosystem"
      },
      {
        name: "The MAXIM CHATGPT AI",
        verified: false,
        logo: "https://logo",
        about: "No ecosystem"
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
