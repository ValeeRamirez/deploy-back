const Router = require('koa-router');
const jugador = require('./routes/jugador');
const usuarios = require('./routes/usuarios');
const tableros = require('./routes/tableros');
const casillas = require('./routes/casillas');
const partidas = require('./routes/partidas');
const barcos = require('./routes/barcos');
const recursos = require('./routes/recursos');
const dados = require('./routes/dado');
const authRoutes = require('./routes/authentication');
const jwtMiddleware = require('koa-jwt');
const dotenv = require('dotenv');
const scopeProtectedRoutes = require('./routes/scopeExample');

dotenv.config();

const router = new Router();

// cualquier con jugador manda a sus routes
router.use('/jugadors', jugador.routes());
router.use('/casillas', casillas.routes());
router.use('/tableros', tableros.routes());
router.use('/partidas', partidas.routes());
router.use('/barcos', barcos.routes());
router.use('/recursos', recursos.routes());
router.use('/dados', dados.routes());
router.use(authRoutes.routes());

// router.use('/usuarios', usuarios.routes()); //TEMPORAL

//desde esta linea todas las rutas requeriran un jwt
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));
router.use('/usuarios', usuarios.routes());
router.use('/scope-example', scopeProtectedRoutes.routes());

module.exports = router;
