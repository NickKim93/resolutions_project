'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: '$2y$10$/XJC12MXdoDDxvCMW78ls.odQ2gT2ndwS0nnB4iiIeXC2BVtoT8ki',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Alex',
      lastName: 'Brown',
      username: 'alexbrown',
      password: '$2y$10$/XJC12MXdoDDxvCMW78ls.odQ2gT2ndwS0nnB4iiIeXC2BVtoT8ki',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Sam',
      lastName: 'Rock',
      username: 'samrock',
      password: '$2y$10$/XJC12MXdoDDxvCMW78ls.odQ2gT2ndwS0nnB4iiIeXC2BVtoT8ki',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  {});

  await queryInterface.bulkInsert('receipts', [
    {
      fileName: 'receipt1.jpeg',
      employeeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'receipt2.jpeg',
      employeeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'receipt3.jpeg',
      employeeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  {});

  await queryInterface.bulkInsert('spendingResolutions', [
    {
      fileName: 'resolution1.xlxs',
      employeeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'resolution2.xlxs',
      employeeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'resolution3.xlxs',
      employeeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'resolution4.xlxs',
      employeeId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  {});
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
