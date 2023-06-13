const express = require('express'); //Importamos expres
const path = require('path'); //Trabajamos con las rutas de la aplicación
const { engine }  = require('express-handlebars'); //Motor de plantillas
const methodOverride = require('method-override');
// Inicializaciones
const app = express() //Inicializo el servidor

// Configuraciones 
app.set('port',process.env.port || 3000) //Variables globlaes

app.set('views',path.join(__dirname, 'views'))

app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')

// Middlewares 
app.use(express.urlencoded({extended:false})) //Explicamos que vamos a trabajar a traves de formilario
app.use(methodOverride('_method'))
// Variables globales

// Rutas 
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))

//Exporytaciones por default
module.exports = app