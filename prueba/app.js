const fs = require('fs');
//puede llevar cualquier nombre, generalmente
// se sigue la convencion de usar el mismo nombre que la libreria
// fs es parte de la libreria estandard


/**
 * @param {string} directorio de destino
 * @param {string} texto a escribir dentro del archivo
 * @param {function} manejador de funcion 
 */
fs.writeFile("./test.txt", "Hola, Mundo!", function (err) {
    // la funcion es la que maneja lo que sucede despues de termine el evento
    if (err) {
        return console.log(err);
    }
    // las funciones de javascript en nodejs son asincronicas
    // por lo tanto lo que se quiera hacer debe hacerse dentro de la funcion que maneja el evento
    // si uno declara una variable arriba de la funcion, la manipula dentro y la quiere usar
    // despues afuera, se corre el riezgo de que nunca se realice la manipulacion.
    console.log("The file was saved!");
});

// una forma mas orientada a objetos

class Utileria {

    constructor(fs) {
        this.fs = fs;
    }

    /**
     * @param {string} archivo ruta relativa o absoluta del archivo a escribir
     * @param {string} contenido Contenido del archivo a escribir.
     * @param {function} funcion que maneja el evento al termino del mismo
     */
    escibir(archivo, contenido, handler) {
        this.fs.writeFile(archivo, contenido, handler);
    }

    /**
     * @param {string} archivo ruta relativa o absoluta del archivo a escribir
     * @param {function} funcion que maneja el evento al termino del mismo
     */
    leer(archivo, handler) {
        this.fs.readFile(archivo, 'utf8', handler);
    }
}

let utils = new Utileria(fs);
let archivo = "./escribir.txt"
let mensaje = "Este es un mensaje enorme jajajajajaja"
utils.escibir(archivo, mensaje, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("Archivo escrito correctamente!")
    utils.leer(archivo, function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("Contenido: ", data)
    });
});