const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/productos');//con el controller llamo a las funciones que muestran las vistas que tengo armadas

router.get('/productos', controller.index);

router.get('/productos/create', controller.create);
router.post('/productos/store', controller.store);

router.get('/productos/:codigo', controller.show);

router.get('/productos/:codigo/edit', controller.edit);//traer el form con la info del producto a editar
router.put('/productos/update', controller.update);//mediante el method_override envio los datos del form a actualizar en la base

router.delete('/productos/:codigo/delete',controller.delete);//paso un codigo de producto para que el controller lo elimine de la base

module.exports = router;//disponibilizo modulo  router para poder acceder a las rutas desde otros lugares del proyecto