const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const jugadorsQuery = await queryInterface.sequelize.query('SELECT id, posicion FROM "Jugadors"', {
      type: QueryTypes.SELECT,
    });

    const jugadorPosiciones = jugadorsQuery.reduce((acc, jugador) => {
      acc[jugador.id] = jugador.posicion;
      return acc;
    }, {});

    const barcosData = [
      {
        id_jugador: jugadorsQuery[0].id,
        tipo: 'Nivel1',
        posicion: jugadorPosiciones[jugadorsQuery[0].id],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_jugador: jugadorsQuery[2].id,
        tipo: 'Nivel2',
        posicion: jugadorPosiciones[jugadorsQuery[2].id],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_jugador: jugadorsQuery[1].id,
        tipo: 'Nivel2',
        posicion: jugadorPosiciones[jugadorsQuery[1].id],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Asignar las posiciones de los barcos
    for (const barco of barcosData) {
      await queryInterface.sequelize.query(
        `UPDATE "Barcos" SET "posicion" = '${barco.posicion}' WHERE "id_jugador" = ${barco.id_jugador}`,
      );
    }

    return queryInterface.bulkInsert('Barcos', barcosData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Barcos', null, {}),
};
