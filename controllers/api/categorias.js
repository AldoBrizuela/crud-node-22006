const { closeDelimiter } = require('ejs');

const Categoria = require('../../models/Categoria');//requiero el modelo categoria que se creo con sequelize

module.exports.index = (req,res)=>{// este modulo exporta una funcion que se llama index
    
    Categoria.findAll().then(categorias => res.json(categorias));//con res.json envio formato json para que sea consumido
};

module.exports.store = (req,res) =>{
    Categoria.create({
        nombre: req.body.nombre,
        description: req.body.description
    })
    .then(result => res.json(result, 201))//poniendo el codigo http cambio la respuesta que muestra en el postman (201 created, 422 no se puede procesar el json recibido)
    .catch(error => res.json(error, 422));//crear nuevo registro en la tabla con los datos que envio desde postman, si todo va bien con el then envio la categoria creada en formato json sino envio el error

};

module.exports.show = (req,res)=>{
    Categoria.findByPk(req.params.id).then(categoria => res.json(categoria));
};//uso parametros(id) en la ruta para acceder a items en la base de datos y devuelvo en formato json


module.exports.update = (req,res)=>{
    Categoria.update({
        nombre: req.body.nombre,
        description: req.body.description//actualizamos los datos de la categoria con los datos que vienen en el json enviado desde postman
    },{//segundo parametro es otro objeto que es la condicion where cuando actualizo la categoria, teniendo el cuenta el id que mando desde el postman
        where: {
            id: req.body.id
        }
    })
    .then(result => res.json(result))
    .catch(error => res.json(error));//si todo va bien modifico el registro en la tabla con los datos que envio desde postman(id,nombre,etc) y con then envio la categoria creada en formato json sino envio el error
};//con update actualizo el producto y vuelvo a la lista de productos


module.exports.delete = (req,res) => {
    Categoria.destroy({//el metodo recibe un objeto con la condicion where que usa el id
        where: {
            id: req.params.id
        }
    })
    .then(result => res.json(result))
    .catch(error => res.json(error));//si todo va bien elimino el registro en la tabla con los datos que envio desde postman(id,nombre,etc) y con then envio el resultado true(1) o false(0) sino envio el error
};//elimina de la base la categoria cuyo id viene en el req 