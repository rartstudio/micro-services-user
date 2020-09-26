'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('users', [
        {
          name: 'Rudi',
          profession: 'Admin',
          role: 'admin',
          email: 'rudiboy644@gmail.com',
          password: await bcrypt.hash('12345678', 10),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'yanto',
          profession: 'Front End Developer',
          role: 'student',
          email: 'rudi@gmail.com',
          password: await bcrypt.hash('12345678', 10),
          created_at: new Date(),
          updated_at: new Date()
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {}); 
  }
};
