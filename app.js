require('dotenv').config();//lo agrego al proyecto para poder usar variables de entorno que estan en el archivo .env

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');//modulo para manejar vistas por ejemplo para manejar contenido dinamico

app.set('view engine', 'ejs');//aviso a express que voy a usar este modulo para manejar vistas por ejemplo para manejar contenido dinamico

//------Inicio middlewares---funcionalidades que voy tomando por capas---//

app.use(express.static(__dirname + '/public')); //me permite acceder a archivos estaticos de la ruta indicada por ejemplo a contacto.html

app.use(expressLayouts);//cuando tenga una vista primero va a traer este layout

app.use(express.urlencoded({extended:false}));//me habilita para recibir los datos del formulario de contacto en el req.body mediante el metodo post

app.use(require('./routes/index'));//cargar funcionalidades de los routers, que pasa cuando entro a 'x' url. esta es para el index
app.use(require('./routes/productos'));//cargar funcionalidades de los routers, que pasa cuando entro a 'x' url. esta es para productos
app.use(require('./routes/contacto'));

app.use((req,res,next)=>{
    res.status(404).send('Not found');//Como hago para devolver un HTML?
});  //que hago cuando entro a una url que no existe

//------Fin middlewares------//

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`http://localhost:${port}`));