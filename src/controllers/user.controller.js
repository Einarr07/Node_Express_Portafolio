// Importar passport
const passport = require("passport")

// Importar mi modelo
const User = require('../models/user')

//Presentar el formulario para el registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
// Capturar los datos del formulario y guardar en la BBD
const registerNewUser = async(req,res)=>{
    // Desestructurar los datos del formulario
    const{name,email,password,confirmpassword} = req.body
    // Validar si todos los campos están completos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    // Validadción de las contraseñas 
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    // Traer el usuario en base al email
    const userBDD = await User.findOne({email})
    // Verificar si existe el usuario
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    // Guardar el registro en la BDD
    const newUser = await new User({name,email,password,confirmpassword})
    // Encriptacion de password
    newUser.password = await newUser.encrypPassword(password)
    const token = newUser.crearToken()
    sendMailToUser(email,token)
    newUser.save()
    res.redirect('/user/login')
}
// Presentar el formulario para el login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
// Capturar los datos del formulario y hacer el login en la BDD
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})
// Capturar los datos del formulario y hacer el login en la BDD
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

// cONFIRMAR EL TOKEN
const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    // CARGAR EL USUARIO EN BASE AL TOKEN ENVIADO
    const userBDD = await User.findOne({token:req.params.token})
    // SETEAR EL TOKEN A NULL
    userBDD.token = null
    // CAMBIAR EL confirmEmail A true
    userBDD.confirmEmail=true
    //  Guardar en BDD
    await userBDD.save()
    // Mensaje de respuesta
    res.send('Token confirmado, ya puedes iniciar sesión');
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}