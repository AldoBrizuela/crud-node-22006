const mysql = require('mysql'); //requerimos el modulo

const connection = mysql.createConnection({//datos para conectarme a la base de datos
    host: 'localhost', // 127.0.0.1
    user: 'root',
    password: '',
    database: 'cac_22006'
});

connection.connect(error =>{//si hay algun error al conectarme a la base arrojo el error y corta el programa
    if (error) {throw error}
});

/*
connection.query('SELECT * FROM productos',(error, results) => {//traigo los productos de que estan en la base de datos
    if (error) {throw error}
    console.log(results);
});*/

module.exports = connection;

