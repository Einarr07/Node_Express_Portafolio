const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    // LLamar a las variables del archivo .env
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});
// Exportacion del por default del metodo uploadImage
module.exports.uploadImage = async(filePath) => {
    // sUBIR LA IMAGEN DE LA RUTA (FILEPATH) EN LA CARPETA PORTAFOLIO DE CLUDINARY
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}

module.exports.deleteImage = async (publicId)=>{
    
    return await cloudinary.uploader.destroy(publicId)
}