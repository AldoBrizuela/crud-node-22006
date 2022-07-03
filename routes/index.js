const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    res.render('index');//renderizo en pantalla una vista index
}); //que hago cuando entro a la url / (ruta)



module.exports = router;//disponibilizo modulo  router para poder acceder a las rutas desde otros lugares del proyecto