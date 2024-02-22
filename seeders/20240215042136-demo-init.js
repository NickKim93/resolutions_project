'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: '$2b$10$fgK/AP.vBI41MAoEEX4Z4unEIG/6NJ6Fri2VgViFwESjCm3QPCppO',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Alex',
      lastName: 'Brown',
      username: 'alexbrown',
      password: '$2b$10$NX1LMeP0u.svGKTa.8GsseFzo6juqz.rLyxXaCLmp0OgXJZEgxSia',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Sam',
      lastName: 'Rock',
      username: 'samrock',
      password: '$2b$10$NX1LMeP0u.svGKTa.8GsseFzo6juqz.rLyxXaCLmp0OgXJZEgxSia',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  {});

  await queryInterface.bulkInsert('receipts', [
    {
      fileName: 'receipt1.jpeg',
      fileSize: 300,
      employeeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'receipt2.jpeg',
      fileSize: 200,
      employeeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'receipt3.jpeg',
      fileSize: 1000,
      employeeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  {});

  await queryInterface.bulkInsert('spendingResolutions', [
    {
      fileName: 'resolution1.xlxs',
      fileSize: 100,
      employeeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'resolution2.xlxs',
      fileSize: 200,
      employeeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'resolution3.xlxs',
      fileSize: 200,
      employeeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fileName: 'resolution4.xlxs',
      fileSize: 500,
      employeeId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ],
  {});

  await queryInterface.bulkInsert('roles', [
    { name: 'admin' },
    { name: 'team leader' },
    { name: 'tax agent' },
    { name: 'employee' }
  ],
  {});

  await queryInterface.bulkInsert('employeeRoles', [
    { employeeId: 1, roleId: 1 },
    { employeeId: 2, roleId: 2 },
    { employeeId: 2, roleId: 4 },
    { employeeId: 3, roleId: 4 },
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
