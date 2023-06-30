const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Jugador, {
        foreignKey: 'id',
      });
    }
  }
  Usuario.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'El nombre de usuario solo puede contener letras y numeros',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'El email debe ser valido',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword(value) {
          if (value.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres');
          }
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
