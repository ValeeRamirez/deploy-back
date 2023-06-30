const Router = require('koa-router')
const authUtils = require('../lib/auth/jwt')


const router = new Router();

//aqui solo se mete al get si esque es un usuario
router.get('/protecteduser', authUtils.isUser, async (ctx) => {
    ctx.body = {
        message: "Bienvenido a la ruta protegida con el scope user!", user: ctx.state.user
    }
});

router.get('/protectedadmin', authUtils.isAdmin, async (ctx) => {
    ctx.body = {
        message: "Bienvenido a la ruta protegida con el scope admin!", user: ctx.state.user
    }
});

module.exports = router;