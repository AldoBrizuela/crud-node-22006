const connection = require('../../db');


module.exports.index = (req,res)=>{// este modulo exporta una funcion que se llama index
    connection.query('SELECT * FROM productos',(error, results)=>{//traigo los productos de que estan en la base de datos
        if (error) {throw error}
    //res.send('Lista de Productos');//envio por pantalle este mensaje
    //res.render('productos/index', {productos:productos.all()});//renderizo en pantalla la vista index, uso la funcion all creada en el modulo productos.js
    res.render('admin/productos/index', { productos: results, layout: 'layout-admin' } );//renderizo los productos que obtengo en la query de connection, ademas cargo el layout de admin
    });
};

module.exports.create = (req,res)=>{
    res.render('admin/productos/create', { layout: 'layout-admin' });
};

module.exports.store = (req,res) =>{
    connection.query('INSERT INTO productos SET ?',
    {
        codigo:req.body.codigo,
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        categoria_id:req.body.categoria
    },
    (error, results)=>{
        if (error) {throw error}
        res.redirect('/admin/productos');
    });
};

module.exports.show = (req,res)=>{
    //res.send(`Productos: ${req.params.id}`); 
    //res.render('productos/show', {producto:productos.find(req.params.id)}); //busco una vista llamada show dentro de la carpeta views/productos/ y con params id que viene en la ruta obtengo el producto, uso la funcion find creada en el modulo productos.js
    connection.query('SELECT * FROM productos WHERE codigo = ?',//con el ? le estoy diciendo que ahi va un parametro que lo paso en la linea de abajo
    [req.params.codigo],
    (error,results) => {
        if (error){throw error}
        res.render('admin/productos/show', {producto:results[0], layout: 'layout-admin'});//renderizo el producto que obtengo en la query de connection
    });
};//uso parametros en la ruta para acceder a items en la base de datos

module.exports.edit = (req,res) => {
    connection.query('SELECT * FROM productos WHERE codigo = ?',//con el ? le estoy diciendo que ahi va un parametro que lo paso en la linea de abajo
    [req.params.codigo],
    (error,results) => {
        if (error){throw error}
        res.render('admin/productos/edit', {producto:results[0], layout: 'layout-admin'});//renderizo el producto que obtengo en la query de connection
    });
};//uso un parametro para traer en la vista edit los datos de ese producto


module.exports.update = (req,res)=>{
    connection.query('UPDATE productos SET ? WHERE codigo = ?', [{
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        categoria_id : req.body.categoria
    },req.body.codigo], (error,results)=>{
        if (error) {throw error}
        res.redirect('/admin/productos');
    });
};//con update actualizo el producto y vuelvo a la lista de productos


module.exports.delete = (req,res) => {
    connection.query('DELETE FROM productos WHERE codigo = ?',[req.params.codigo],error => {
        if (error) {throw error}

        res.redirect('/admin/productos');
    });
};//elimina de la base el producto cuyo codigo viene en el req y redirecciona a productos