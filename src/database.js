const mongoose = require('mongoose') //Para trabajar con nuestra BD

const {DBUSER,DBPASSWORD,DBNAME} = process.env //Esta es una desestructuración de un objeto 
const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.xww8zdg.mongodb.net/${DBNAME}`
//const MONGODB_URI = 'mongodb://0.0.0.0:27017/portafolio' //La direccion

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