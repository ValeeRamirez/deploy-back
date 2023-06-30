const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const partidaQuery = await queryInterface.sequelize.query('SELECT id FROM "Partidas"', {
      type: QueryTypes.SELECT,
    });
    const partidas = partidaQuery.map((partida) => partida.id);

    const dadoData = [
      {
        caras: 3,
        resultado: 0,
        id_partida: partidas[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('Dados', dadoData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Dados', null, {}),
};
