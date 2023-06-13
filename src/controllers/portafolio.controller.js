// Hacer la importacion de nuestro modelo
const Portfolio = require('../models/portafolio')

const renderAllPortafolios = async(req,res)=>{
    // A partir del modelo usar el metodo find y luego el metodo lean
    const portfolios = await Portfolio.find().lean()
    // Invocar la vista y pasar la variable portafolios
    res.render("portafolio/allPortfolios",{portfolios})
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
// Presentación del formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
// Capturo los datos del formulario para almacenar en la BD
const createNewPortafolio = async(req,res)=>{
    // Desestructurar
    const {title, category,description} = req.body
    //Crear una nueva instancia
    const newPortfolio = new Portfolio({title,category,description})
    // Ejecutar el metodo save
    await newPortfolio.save()
    res.redirect('/portafolios')
}
const renderEditPortafolioForm = async(req,res)=>{
    //  A partir del modelo llamara al metodo findById
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // Con la variable portafolio pintar en la vista del formulario
    res.render('portafolio/editPortfolio',{portfolio})
}
const updatePortafolio = async(req,res)=>{
    // Capturamos los datos del formulario
    const {title,category,description}= req.body
    // Aártir del modelo llamar al metodo findByIdAndUpdate
    // Pasamos a la funcion el ide del portafolio y los datos a modificar
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    // Redirect
    res.redirect('/portafolios')
}
const deletePortafolio = async(req,res)=>{
    // A partir del modelo usar el metodo findByIdAndDelete
    await Portfolio.findByIdAndDelete(req.params.id)
    // Hacer el redirect
    res.redirect('/portafolios')
}


module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}