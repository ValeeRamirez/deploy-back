const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'id_partida',
      });
      this.hasOne(models.Barco, {
        foreignKey: 'id',
      });
      this.hasMany(models.Recurso, {
        foreignKey: 'id',
      });
      // no se si tiene many o solo uno
    }
  }
  Jugador.init({
    id_usuario: DataTypes.INTEGER,
    id_partida: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    posicion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Jugador',
  });
  return Jugador;
};
