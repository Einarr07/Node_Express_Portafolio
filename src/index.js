require('dotenv').config() //Este siempre debe ir primero para cargar la imagen
const app = require('./server.js') //exportmaos de nuestro server

const connection = require('./database.js') //exportamos nuestra BD


connection() //Llamamos a nuestra funcion

app.listen(app.get('port'),()=>{ //Llamamos a nuestra variable
    console.log(`Server on port ${app.get('port')}`);
})