const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tablero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Casilla, {
        foreignKey: 'id',
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'id_partida',
      });
      // define association here
    }
  }
  Tablero.init({
    id_partida: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tablero',
  });
  return Tablero;
};
