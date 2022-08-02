const connection = require('../db');


module.exports.index = (req,res)=>{// este modulo exporta una funcion que se llama index
    connection.query('SELECT * FROM productos',(error, results)=>{//traigo los productos de que estan en la base de datos
        if (error) {throw error}
    //res.send('Lista de Productos');//envio por pantalle este mensaje
    //res.render('productos/index', {productos:productos.all()});//renderizo en pantalla la vista index, uso la funcion all creada en el modulo productos.js
    res.render('productos/index', {productos:results});//renderizo los productos que obtengo en la query de connection
    });
};

module.exports.show = (req,res)=>{
    //res.send(`Productos: ${req.params.id}`); 
    //res.render('productos/show', {producto:productos.find(req.params.id)}); //busco una vista llamada show dentro de la carpeta views/productos/ y con params id que viene en la ruta obtengo el producto, uso la funcion find creada en el modulo productos.js
    connection.query('SELECT * FROM productos WHERE codigo = ?',//con el ? le estoy diciendo que ahi va un parametro que lo paso en la linea de abajo
    [req.params.codigo],
    (error,results) => {
        if (error){throw error}
        res.render('productos/show', {producto:results[0]});//renderizo el producto que obtengo en la query de connection
    });
};//uso parametros en la ruta para acceder a items en la base de datos
