const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuariosQuery = await queryInterface.sequelize.query('SELECT id FROM "Usuarios"', {
      type: QueryTypes.SELECT,
    });
    const partidaQuery = await queryInterface.sequelize.query('SELECT id FROM "Partidas"', {
      type: QueryTypes.SELECT,
    });
    const usuarios = usuariosQuery.map((usuario) => usuario.id);
    const partidas = partidaQuery.map((partida) => partida.id);

    const jugadorsData = [
      {
        id_usuario: usuarios[0],
        id_partida: partidas[0],
        tipo: 'Principiante',
        posicion: '(0,0)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: usuarios[1],
        id_partida: partidas[0],
        tipo: 'Avanzado',
        posicion: '(5,5)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: usuarios[2],
        id_partida: partidas[0],
        tipo: 'Avanzado',
        posicion: '(3,2)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('Jugadors', jugadorsData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Jugadors', null, {}),
};
