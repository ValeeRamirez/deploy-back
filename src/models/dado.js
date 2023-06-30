const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Partida, {
        foreignKey: 'id_partida',
      });
    }
  }
  Dado.init({
    caras: DataTypes.INTEGER,
    resultado: DataTypes.INTEGER,
    id_partida: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Dado',
  });
  return Dado;
};
