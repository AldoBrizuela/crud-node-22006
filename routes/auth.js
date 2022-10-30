const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const connection = require('../db');//me conecta a la base de datos

router.get('/login',(req, res) => {
    res.render('auth/login', { layout: 'layout-auth'});
});//me lleva a la pagina login


router.post('/login', (req,res) => {
    connection.query('SELECT * FROM usuarios WHERE email = ?',[ req.body.email ],async (error,results) => {
        if (error) {throw error}
        
        if (results.length == 0) {//si el resultado de la busqueda del mail es 0 es porque no hay registro con ese mail
            res.send('El correo y/o contraseña son incorrectos');
        } else if (await bcryptjs.compare(req.body.password, results[0].password) == false){//compare se usa para poder comparar la contrasena que esta encriptada, espera una promera de true o false para validar, como es una promesa tengo que esperar y usar async await
            res.send('El correo y/o contraseña son incorrectos');
        } else {
            req.session.user_id = results[0].id;//guardo un dato en una variable de sesion esto despues se mantiendo mediante cookie-session

            res.redirect('/');
        }
    });
});


router.get('/register',(req, res) => {
    res.render('auth/register', { layout: 'layout-auth'});
});//me lleva a la pagina register de usuario


router.post('/register', async (req, res) => {
    const hash = await bcryptjs.hash(req.body.password, 8);//encripta la contrasena y devuelve una promesa, hay que esperar a que termine el proceso de encriptacion para que continue con el codigo

    connection.query('INSERT INTO usuarios SET ?', { email: req.body.email, password: hash}, error =>{//guardo el mail y la contrasena encryptada
        if (error) {throw error}

        res.redirect('/');//si no hay error recibo los datos y redicciono a la pagina principal
    });
});// obtengo los datos que ingresaron en el formulario de la pagina register

router.get('/logout', (req, res) => {//para cerrar la session
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;