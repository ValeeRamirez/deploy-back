module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Partidas', [
    {
      codigo: 160101,
      creador: 'nicolarenas',
      turno: 'valeramirez',
      ganador: 'valeramirez',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Partidas', null, {}),
};
