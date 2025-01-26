'use strict';
const uuid = require("uuid");

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
   queryInterface.bulkInsert("users", [
    {
      firstName: "John",
      lastName: "Mark",
      email: "johnmark1@gmail.com",
      wallet: "0x171c8C090511bc95886c9AAc505dB3081FE72F97",
      fromUS: false,
      phone: "123456",
      nonce: uuid.v4()
    },
    {
      firstName: "John",
      lastName: "Mark",
      email: "johnmark2@gmail.com",
      wallet: "0xfe499003c852a96E168b22b76c28CA12d471C457",
      fromUS: false,
      phone: "123456",
      nonce: uuid.v4()
    },
    {
      firstName: "John",
      lastName: "Mark",
      email: "johnmark3@gmail.com",
      wallet: "0xF8AbE936Ff2bCc9774Db7912554c4f38368e05A2",
      fromUS: false,
      phone: "123456",
      nonce: uuid.v4()
    },
    {
      firstName: "John",
      lastName: "Mark",
      email: "johnmark4@gmail.com",
      wallet: "0x26d70cD0801a6ba2752C605109Bb67676ce46c7b",
      fromUS: false,
      phone: "123456",
      nonce: uuid.v4()
    }
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
