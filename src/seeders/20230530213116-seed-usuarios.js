const bcrypt = require('bcrypt');
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Usuarios', [
    {
      username: 'valeramirez',
      password: bcrypt.hashSync('vale1234', 10),
      email: 'valitaramirez@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'nicolarenas',
      password: bcrypt.hashSync('nico1235', 10),
      email: 'nicolitarenas@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'cristobalrubio',
      password: bcrypt.hashSync('cris1235', 10),
      email: 'cristobalrubio@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),  
  down: (queryInterface) => queryInterface.bulkDelete('Usuarios', null, {}),
};
