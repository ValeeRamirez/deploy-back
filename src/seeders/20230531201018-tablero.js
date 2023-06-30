const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const partidaQuery = await queryInterface.sequelize.query('SELECT id FROM "Partidas"', {
      type: QueryTypes.SELECT,
    });
    const partidas = partidaQuery.map((partida) => partida.id);

    const tableroData = [
      {
        id_partida: partidas[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('Tableros', tableroData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Tableros', null, {}),
};
