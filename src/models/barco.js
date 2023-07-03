const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Barco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Jugador, {
        foreignKey: 'id_jugador',
      });
      // define association here
    }

    static async create(values, options) {
      const jugador = await this.sequelize.models.Jugador.findByPk(values.id_jugador);
      if (jugador) {
        values.posicion = jugador.posicion; // Actualizar la posición del barco con la posición del jugador
      }
      return super.create(values, options);
    }

    static async update(values, options) {
      const jugador = await this.sequelize.models.Jugador.findByPk(values.id_jugador);
      if (jugador) {
        values.posicion = jugador.posicion; // Actualizar la posición del barco con la posición del jugador
      }
      return super.update(values, options);
    }

    async getJugadorDueno() {
      const jugador = await this.getJugador();
      if (jugador) {
        return {
          jugador,
        };
      }
      return null;
    }
  }
  Barco.init({
    id_jugador: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    posicion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Barco',
    // hooks: {
    //   beforeCreate: async (barco, options) => {
    //     const jugador = await barco.getJugador(); // Obtener el jugador asociado al barco
    //     if (jugador) {
    //       barco.posicion = jugador.posicion; // Actualizar la posición del barco con la posición del jugador
    //     }
    //   },
    //   beforeUpdate: async (barco, options) => {
    //     const jugador = await barco.getJugador(); // Obtener el jugador asociado al barco
    //     if (jugador) {
    //       barco.posicion = jugador.posicion; // Actualizar la posición del barco con la posición del jugador
    //     }
    //   },
    // },
  });

  return Barco;
};
