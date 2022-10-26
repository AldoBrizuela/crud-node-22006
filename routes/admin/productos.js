const express = require('express');
const router = express.Router();
const multer = require('multer');
//const upload = multer({ dest: 'uploads/'});//creo una instancia de multer para utilizarlo de middleware, en esta ruta se guardaran los archivos que lleguen en el formulario
const upload = multer({ storage: multer.memoryStorage()});// recibe el archivo y lo deja en memoria para que lo pueda utilizar por lo que no guarda directamente el archivo

const controller = require('../../controllers/admin/productos');//con el controller llamo a las funciones que muestran las vistas que tengo armadas

router.get('/productos', controller.index);

router.get('/productos/create', controller.create);
router.post('/productos/store', upload.single('imagen'), controller.store);//con el middelware upload cargo la imagen que se adjunta .single para un archivo single('imagen', 10) para multiples archivos en este ejemplo 10

router.get('/productos/:codigo', controller.show);

router.get('/productos/:codigo/edit', controller.edit);//traer el form con la info del producto a editar
router.put('/productos/update', upload.single('imagen'), controller.update);//mediante el method_override envio los datos del form a actualizar en la base

router.delete('/productos/:codigo/delete',controller.delete);//paso un codigo de producto para que el controller lo elimine de la base

module.exports = router;//disponibilizo modulo  router para poder acceder a las rutas desde otros lugares del proyecto