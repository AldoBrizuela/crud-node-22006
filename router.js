const express = require('express');
const router = express.Router();

const productos = require('./productos');//solo puedo usar de este modulo lo que exporte en el mismo (funciones all y find)

router.get('/', (req,res) => {
    res.render('index');//renderizo en pantalla ula vista index
}); //que hago cuando entro a la url / (ruta)

router.get('/productos',(req,res)=>{
    res.render('productos/index', {productos:productos.all()});//renderizo en pantalla la vista index, uso la funcion all creada en el modulo productos.js
});
/*
router.get('/productos',(req,res)=>{
    res.send('Lista de Productos');//envio por pantalle este mensaje
});

router.get('/productos/:id',(req,res)=>{
    res.send(`Productos: ${req.params.id}`); 
});//uso parametros en la ruta para acceder a items en la base de datos
*/

router.get('/productos/:id',(req,res)=>{
    res.render('productos/show', {producto:productos.find(req.params.id)}); //busco una vista llamada show dentro de la carpeta views/productos/ y con params id que viene en la ruta obtengo el producto, uso la funcion find creada en el modulo productos.js
});//uso parametros en la ruta para acceder a items en la base de datos


module.exports = router;//disponibilizo modulo  router para poder acceder a las rutas 