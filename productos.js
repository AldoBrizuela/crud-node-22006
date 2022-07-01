const productos = [
    {id: 1, name: 'Producto Nro 1'},
    {id: 2, name: 'Producto Nro 2'},
    {id: 3, name: 'Producto Nro 3'}
];

//genero funciones all y find para exponer la info del array de este modulo
const all = () => productos;//funcion que hace publico/retorna el array

const find = (id) => productos.find(producto => producto.id == id);//recibe un id y con eso recorre el array y devuelve la coincidencia, si no encuentra devuelve vacio

module.exports = {
    all,
    find
};//disponibilizo los metodos para usarlo desde otro lado