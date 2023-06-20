// Importatcion de passport
const passport = require('passport')
// Imporatacion del modelo user
const User = require('../models/user')
// Definicion de la estrategia
const LocalStrategy = require('passport-local').Strategy

// Configuracion de la estrategia
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    // Traer el usuario en base al email
    const userBDD = await User.findOne({email})
    // Validacion del usiario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    // Validacion de contraseñas
    const passwordUser = await userBDD.matchPassword(password)
    // Validacion del password del formulario vs el de la BDD
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    // Validacion de la confirmacion del mail
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    // Retornar el usuario
    return done(null,userBDD)
}))

// Serializacion del usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// Deserializacion del usuario
passport.deserializeUser(async (id, done) => {
    // Traer el usuario en base al id de la session
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});