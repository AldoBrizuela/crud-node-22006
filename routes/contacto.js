const express = require('express');
const router = express.Router();

const {body, validationResult, check} = require('express-validator');//para hacer validaciones del contenido que recibo en el formulario

router.get('/contacto', (req,res)=> {
    res.render('contacto/contacto',{values:{}});
});//cuando entro a contacto muestro la vista contacto donde esta el formulario de contacto


router.post('/contacto',[
    body('nombre', 'El nombre es obligatorio y debe tener al menos 3 caracteres').exists().isLength(3).escape(),//con esto validado que el nombre no venga con menos de 3 caracteres
    body('email','El correo es obligatorio').exists().isEmail().normalizeEmail(),
    //body('mensaje', 'El mensaje es obligatorio').exists().notEmpty().isLength({max:3})
    check('mensaje')
        .exists()
        .notEmpty()
        .withMessage('El mensaje es obligatorio')
        .isLength({min:6})
        .withMessage('E mensaje debe tener mas de 5 caracteres')
        .trim().escape()
], (req, res)=> {
    const errors = validationResult(req);//veo si hay errores en el formulario
    console.log(req.body,errors);
   
    if (errors.isEmpty()){
        res.send('Enviando...');//si no hay errores envio el formulario a la base
    }else{
        res.render('contacto/contacto', {values:req.body, errors:errors.array()});//si hay errores muestro de nuestro el fomulario y los errores que tiene
    };
});//cuando se envia info desde el formulario la recibo en el req.body por metodo post

module.exports = router;