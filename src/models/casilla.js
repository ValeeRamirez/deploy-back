const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Casilla extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tablero, {
        foreignKey: 'id_tablero',
      });
      // define association here
    }
  }
  Casilla.init({
    tipo: DataTypes.STRING,
    accion: DataTypes.STRING,
    id_tablero: DataTypes.INTEGER,
    coordenadas: DataTypes.STRING,
    front: DataTypes.STRING,
    back: DataTypes.STRING,
    id_casilla: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Casilla',
  });
  return Casilla;
};
