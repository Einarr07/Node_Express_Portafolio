// Invocar la función router
const { Router } = require('express');

// Invocar las funciones del controlador
const {
  renderRegisterForm,
  registerNewUser,
  renderLoginForm,
  loginUser,
  logoutUser,
  confirmEmail,
  perfilUsuario,
  renderEdit,
  updateEdit
} = require('../controllers/user.controller');

// Inicializar la función de la variable router
const router = Router();

// Definir las rutas
router.get('/user/confirmar/:token', confirmEmail);
router.get('/user/register', renderRegisterForm);
router.post('/user/register', registerNewUser);
router.get('/user/login', renderLoginForm);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);

router.get('/user/perfil/:id', perfilUsuario);
router.get('/user/editarPerfil/:id', renderEdit)
router.put('/user/editarPerfil/:id', updateEdit)

module.exports = router;