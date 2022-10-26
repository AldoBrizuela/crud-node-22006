const { Model, DataTypes } = require('sequelize');//las clases model y datatypes ya vienen con algunos metodos para usar
const sequelize = require('../db2');//para usar la instancia que se creo de sequeleze

class Categoria extends Model {}//extens significa que Categoria hereda todo de Model

Categoria.init({//init metodo que heredo de Model para inicializar el modelo, se puede agregar validaciones en el modelo
    nombre: {
       type: DataTypes.STRING,//el nombre de mi objeto Categoria va a ser un string
       allowNull: false,//no permite nulos
       validate: {//que sea alfanumerico con un minimo de 4 caracteres
        isAlphanumeric: true,
        min: 4
       }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true//la descripcion va a ser text
    }
}, { sequelize, modelName: 'categoria'});//recibo la instancia de los datos de la bd y el nombre con el que se va a crear la tabla en la db

module.exports = Categoria;