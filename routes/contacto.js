const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');


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
        .withMessage('El mensaje debe tener mas de 5 caracteres')
        .trim().escape()
], (req, res)=> {
    const errors = validationResult(req);//veo si hay errores en el formulario
    console.log(req.body,errors);
   
    if (errors.isEmpty()){

        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
                user: '526d3c61092216',
                pass: 'ef40d9a9247a7d'
            }
        });

        ejs.renderFile(__dirname + '/../views/contacto/correo.ejs',{ body:req.body }, (error, html) => {
            if (error) {throw error}
            
            const options = {
                from: req.body.email,
                to: 'contacto@litoral.com',
                subject: 'Litoral',
                html: html//envio la vista correo.ejs que recibo en el call back
            }
    
            transporter.sendMail(options, (error,info)=>{
                if (error) {throw error}
                console.log(info);
            });//envio el correo si la vista responde ok

        });//render de la vista correo.ejs, a la vista le paso el objeto body con los datos que viene en el req.body




        res.send('Enviando...');//si no hay errores envio el formulario a la base
    }else{
        res.render('contacto/contacto', {values:req.body, errors:errors.array()});//si hay errores muestro de nuestro el fomulario y los errores que tiene
    };
});//cuando se envia info desde el formulario la recibo en el req.body por metodo post

module.exports = router;