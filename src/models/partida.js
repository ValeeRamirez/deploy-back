const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Jugador, {
        foreignKey: 'id',
      });
      this.hasOne(models.Tablero, {
        foreignKey: 'id',
      });
      this.hasOne(models.Dado, {
        foreignKey: 'id',
      });
    }
  }
  Partida.init({
    codigo: DataTypes.INTEGER,
    creador: DataTypes.STRING,
    turno: DataTypes.STRING,
    ganador: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Partida',
  });
  return Partida;
};
