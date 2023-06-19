// Hacer la importacion de nuestro modelo
const Portfolio = require('../models/portafolio')
// IMPORTAMOS EL MEDOTDO
const { uploadImage,deleteImage } = require('../config/clodinary')

//
const fs = require('fs-extra')

const renderAllPortafolios = async(req,res)=>{
    // A partir del modelo usar el metodo find y luego el metodo lean
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
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
    // A la instancia del documento le agrego ahora el usuario
    // req.user
    newPortfolio.user = req.user._id
    // VALIDACION DE LA IMAGEN
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    // Hacemos la invocacion del metodo y le paso el path de la imagen
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    // Eliminar el archivo tem de la carpeta uploads
    // Es importante para que no se sobre cargue
    await fs.unlink(req.files.image.tempFilePath)
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
    // Verificar el ID del portafolio sea el mismo
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // Si es TRUE continuar con la condicion y si es false enviar a la ruta portafolios
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}
const deletePortafolio = async(req,res)=>{
    // A partir del modelo usar el metodo findByIdAndDelete
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
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