const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const connection = require('../../db');//me conecta a la base de datos

router.post('/login', (req,res) => {

    if (req.body.email && req.body.password){
        connection.query('SELECT * FROM usuarios WHERE email = ?',[ req.body.email ],async (error,results) => {
            if (error) {throw error}
            
            if (results.length == 0) {//si el resultado de la busqueda del mail es 0 es porque no hay registro con ese mail
                res.json({error:'El correo y/o contraseña son incorrectos - 1'});
            } else if (await bcryptjs.compare(req.body.password, results[0].password) == false){//compare se usa para poder comparar la contrasena que esta encriptada, espera una promera de true o false para validar, como es una promesa tengo que esperar y usar async await
                res.json({error:'El correo y/o contraseña son incorrectos - 2'});
            } else {
                const payload = { user_id: results[0].id}//guardo el user que recibo en el results desde la db
                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });//genero/firmo el token a partir de la variable de entorno

                res.json({ token: token});//envio el token para que el usuario lo utilice, el front lo debe guardar para usarlo en cada peticion que realice 
            }
        });
    }else{
        res.json({error:'El correo y/o contraseña son incorrectos - 3'});
    }
});

const isJWTLogin = (req, res, next) => {
    let token = req.headers['authorization'];//los token se envian en los headers
    //console.log(token); 

    if (!token){
        return res.sendStatus(401);//si no tengo el token 401 es no esta autorizado, return para que no siga la siguiente capa
    } else{
        
        token = token.replace('Bearer ', '');//para obtener solo el token si el Bearer
        
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error){
                return res.sendStatus(401);//si tengo token lo valido, 401 es no esta autorizado, return para que no siga la siguiente capa
            } else {
                console.log(decoded);
                next();//si el token es correcto permito el ingreso
            }
        }); // verifico si el token es valido usando la variable de entorno-firma
    }
};//valida que el token sea valido sino no puede ingresar

router.get('/perfil', isJWTLogin, (req, res) => {
    res.json ({ perfil: {name: 'Juan'}}
)});//que pasa cuando acceso a la ruta de perfil

module.exports = router;