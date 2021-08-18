/*  Probar que funciona crearserver
 // Paso 1
const http = require('http')
// Paso 2
http
 .createServer(function (req, res) {
 // Paso 3
 console.log('Bienvenido a la matrix')
 })
.listen(8080, () => console.log('Escuchando el puerto 8080')) 
// Paso 4 */

//npm init
//npm install
//en terminal escribir node index.js  y dira esuchando el puerto 8080
//correr el html por ejemplo con live server, llenar los datos de formulario
//si no funciona entonces volver a escribir en terminal escribir node index.js
// crear archivo y llevara a la ruta por ejemplo http://localhost:8080/crear?archivo=triodinamico&contenido=ahorasiquesi   y en carpeta se vera el archivo creado



const http = require('http')
const url = require('url')
const fs = require('fs')
http
.createServer(function (req, res) {
const params = url.parse(req.url, true).query
const archivo = params.archivo
const nombre = params.nombre    //puede ser const archivo o con nombre, como a uno le sea mas claro
const nuevonombre = params.nuevoNombre //se guarda en nuevonombre los parametros ingresados en el formulario Html en nuevoNombre (linea49)
const contenido = params.contenido
if (req.url.includes('/crear')) {
//    res.write(`hola chicos`)
fs.writeFile(archivo, contenido, () => {
res.write('Archivo creado con éxito!')
res.end()
})
}
if (req.url.includes('/leer')) {
fs.readFile(archivo, (err, data) => {
res.write(data)
res.end()
})
}
if (req.url.includes('/renombrar')) {
    console.log('archivo ' , archivo)  //para comprobar que se guardo en archivo
    console.log('nombre ' , nombre)//para comprobar que se guardo en nombre
fs.rename(nombre, nuevonombre, (err, data) => {    //nombre es el archivo, porque en el formulario html en el input linea 45 es nombre (input name= nombre). y nuevonombre es el const que hicimos en este js
res.write(`Archivo ${nombre} renombrado por ${nuevonombre}`)
res.end()
})
}

if (req.url.includes('/eliminar')) {
fs.unlink(archivo, (err, data) => {
res.write(`Archivo ${archivo} eliminado con éxito`)
res.end()
})
}
})
.listen(8080, () => console.log('Escuchando el puerto 8080'))