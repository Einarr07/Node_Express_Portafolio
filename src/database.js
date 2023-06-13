const mongoose = require('mongoose') //Para trabajar con nuestra BD

const MONGODB_URI = 'mongodb://0.0.0.0:27017/portafolio' //La direccion

const {DBUSER,DBPASSWORD,DBNAME} = process.env //Esta es una desestructuración de un objeto 
console.log(DBNAME)

connection = async()=>{
    try {
         await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true //La documentacion lo requiere (es una configuracion extra)
        })
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection //Exportamos nuestra variable