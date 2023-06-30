const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recurso extends Model {
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
  }
  Recurso.init({
    tipo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Recurso',
  });
  return Recurso;
};
