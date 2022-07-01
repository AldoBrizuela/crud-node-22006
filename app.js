require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');//aviso a express que voy a usar este modulo para manejar vistas por ejemplo para menejar contenido dinamico

//------Inicio middlewares---funcionalidades que voy tomando por capas---//

app.use(express.static(__dirname + '/public')); //me permite acceder a archivos estaticos de la ruta indicada por ejemplo a contacto.html

app.use(expressLayouts);//cuando tenga una vista primero va a traer este layout

app.use(require('./router'));//uso el modulo router creado usando el router de express para poder agrupar las rutas en router.js

app.use((req,res,next)=>{
    res.status(404).send('Not found');//Como hago para devolver un HTML?
});  //que hago cuando entro a una url que no existe

//------Fin middlewares------//

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`http://localhost:${port}`));