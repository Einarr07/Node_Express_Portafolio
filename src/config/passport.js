const passport = require('passport')
const User = require('../models/User')

const LocalStrategy = require('passport-local').Strategy



passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    //TRAER USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    //VALIDACION DEL USUARIO
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //VALIDACION DE LAS CONTRASEÑAS
    const passwordUser = await userBDD.matchPassword(password)
    //VALIDACION DEL PASSWORD DEL FORMULARIO VS EL DE LA BD
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    //retorno de lo que vera el usuario
    return done(null,userBDD)
}))
//SERIALIZACION DEL USUARIO
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//DESERIALIZACION DEL USUARIO
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});