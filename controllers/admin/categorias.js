const Categoria = require('../../models/Categoria');//requiero el modelo categoria que se creo con sequelize

module.exports.index = (req,res)=>{// este modulo exporta una funcion que se llama index
    
    Categoria.findAll().then(categorias => {
        res.render('admin/categorias/index', { categorias: categorias, layout: 'layout-admin' } );//renderizo las categorias que obtengo con el find all mediante el ORM, ademas cargo el layout de admin
    });
};

module.exports.create = (req,res)=>{
    res.render('admin/categorias/create', { layout: 'layout-admin' });//muestro las vista para crear una categoria
};

module.exports.store = (req,res) =>{
    Categoria.create({
        nombre: req.body.nombre,
        description: req.body.description
    }).then(() => res.redirect('/admin/categorias'));//crear nuevo registro en la tabla con los datos que viene en el formulario y si todo va bien con el then redirecciono a categorias

};

module.exports.show = (req,res)=>{
    Categoria.findByPk(req.params.id).then(categoria => {
        res.render('admin/categorias/show', {categoria:categoria, layout: 'layout-admin'});//renderizo el detalle de la categoria que obtengo con el find mediante el id
    });
};//uso parametros en la ruta para acceder a items en la base de datos

module.exports.edit = (req,res) => {
    Categoria.findByPk(req.params.id).then(categoria => {
        res.render('admin/categorias/edit', {categoria:categoria, layout: 'layout-admin'});//renderizo form para editar la categoria que obtengo con el find mediante el id
    });
};//uso un parametros para traer en la vista edit los datos de ese producto


module.exports.update = (req,res)=>{
    Categoria.update({
        nombre: req.body.nombre,
        description: req.body.description//actualizamos los datos del modelo con los datos que vienen en el form
    },{//segundo parametro es otro objeto que es la condicion where cuando actualizo el modelo, teniendo el cuenta el campo oculto del form
        where: {
            id: req.body.id
        }
    }).then(()=> res.redirect('/admin/categorias'));//si esta todo bien redirecciona a categorias
};//con update actualizo el producto y vuelvo a la lista de productos


module.exports.delete = (req,res) => {
    Categoria.destroy({//el metodo recibe un objeto con la condicion where que usa el id
        where: {
            id: req.params.id
        }
    }).then(()=> res.redirect('/admin/categorias'));//si esta todo bien redirecciona a categorias
};//elimina de la base la categoria cuyo id viene en el req 