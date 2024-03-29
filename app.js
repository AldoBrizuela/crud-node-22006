require('dotenv').config();//lo agrego al proyecto para poder usar variables de entorno que estan en el archivo .env

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');//modulo para manejar vistas por ejemplo para manejar contenido dinamico
const methodOverride = require('method-override');//modulo para poder hacer el CRUD
//const session = require('express-session');//requerimos el modulo de session, para guardar la sesion en el servidor
//const cookie = require('cookie-parser');//para usar cookies
const session = require('cookie-session');//para guardar sesion en el cliente/navegador
const cors = require('cors');//para permitir que aplicaciones hagan peticiones a la api

const sequelize = require('./db2');//requerimos la instancia con los datos de la BdD

//app.use(session({//configuro el modulo de session, el como se encriptan los datos lo maneja la libreria express-session
//    secret: 'V9k_XMJtC.w]',//generar hash en alguna web (generador de password) para usarla de contrasena 
//    resave:false,//para evitar el reguardado y mejorar la performance
//    saveUninitialized: false // mejorar la performance
//}));
//app.use(cookie());//usar cookies

app.use(session({//configuro el modulo de session, keys se usan para encriptar los datos lo maneja la libreria ookie-session
    keys: ['QeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4','+KbPeShVkYp3s6v9y$B&E)H@McQfTjWn']
}));

app.set('view engine', 'ejs');//aviso a express que voy a usar este modulo para manejar vistas por ejemplo para manejar contenido dinamico

//------Inicio middlewares---funcionalidades que voy tomando por capas---//

app.use(express.static(__dirname + '/public')); //me permite acceder a archivos estaticos de la ruta indicada por ejemplo a contacto.html

app.use(expressLayouts);//cuando tenga una vista primero va a traer este layout

app.use(express.urlencoded({extended:false}));//me habilita para recibir los datos del formulario de contacto en el req.body mediante el metodo post
app.use(methodOverride('_method'));//configuro como voy a usar el methodo, sirve para poder mandar put

app.use(express.json());//me habilita recibir info a traves de json
app.use(cors());//para permitir que aplicaciones hagan peticiones a la api

const isLogin = (req,res,next) => {//es next hace que siga si es que esta loguedo
    if (!req.session.user_id){//si no esta iniciada la sesion manda al login
       return res.redirect('/login');
    }

    next();
};

app.use(require('./routes/index'));//cargar funcionalidades de los routers, que pasa cuando entro a 'x' url. esta es para el index
app.use(require('./routes/productos'));//cargar funcionalidades de los routers, que pasa cuando entro a 'x' url. esta es para productos
app.use(require('./routes/contacto'));

app.use('/admin', isLogin, require('./routes/admin/productos'));//cargar funcionalidades de los routers, que pasa cuando entro a 'x' url. esta es para productos, con prefijo /admin
app.use('/admin', isLogin, require('./routes/admin/categorias'));

app.use('/api', require('./routes/api/categorias')); //para el logueo se usa un json ya que no hay front
app.use('/api', require('./routes/api/jwt')); //para el logueo se usa un json ya que no hay front


app.use(require('./routes/auth'));

app.use((req,res,next)=>{
    res.status(404).send('Not found');//Como hago para devolver un HTML?
});  //que hago cuando entro a una url que no existe

//------Fin middlewares------//

const port = process.env.PORT || 3000;

app.listen(port, async ()=> { 
    
    console.log(`http://localhost:${port}`);

    try {
        // await sequelize.authenticate();// intenta autenticar con la base de datos, await para que espere la respuesta a la conexion para seguir
        await sequelize.sync();// con sync si no existe la tabla categoria la crea, await para que espere la respuesta a la conexion para seguir

        console.log('Sequelize ok');
    } catch(error) {
        console.log('Error de sequelize' + error);//si hay algun error en la conexion a la bdd
    }
});