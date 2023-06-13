const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    }
},{
    timestamps:true //Cuando a sido creado y actulizado el documento
})

// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10) //Se recomienda 10 (para ña emcroptacopm)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}


module.exports = model('user',userSchema) //Nombre del modelo