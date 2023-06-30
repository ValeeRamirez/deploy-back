const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const jugadorsQuery = await queryInterface.sequelize.query('SELECT id FROM "Jugadors"', {
      type: QueryTypes.SELECT,
    });

    const jugadors = jugadorsQuery.map((jugador) => jugador.id);

    const recursosData = [
      {
        tipo: 'Trigo',
        id_jugador: jugadors[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: 'Metal',
        id_jugador: jugadors[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: 'Madera',
        id_jugador: jugadors[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('Recursos', recursosData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Recursos', null, {}),
};
