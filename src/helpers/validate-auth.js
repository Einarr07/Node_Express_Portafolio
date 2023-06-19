// Exportando una funcion isAuthenticated

module.exports.isAuthenticated = (req,res,next)=>{
    // Validacion del isAuthenticated
    if(req.isAuthenticated()){
        //Continua con las demas rutas
        return next()
    }
    // Redirecion al login
    res.redirect('/user/login')
}