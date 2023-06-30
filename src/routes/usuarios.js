const Router = require('koa-router');

const router = new Router();

// // crea un usuario
// router.post('usuarios.create', '/', async (ctx) => {
//   try {
//     const usuario = await ctx.orm.Usuario.create(ctx.request.body);
//     ctx.status = 201;
//     ctx.body = usuario;
//   } catch (error) {
//     ctx.status = 400;
//     ctx.body = error;
//   } 
// });

// muestra todos los usuarios creados
router.get('usuarios.list', '/', async (ctx) => {
  try {
    const usuarios = await ctx.orm.Usuario.findAll();
    ctx.status = 200;
    ctx.body = usuarios;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// encuentra a un usuario por su id
router.get('usuarios.findby', '/id/:id', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuario.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = usuario;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// encuentra a un usuario por su id
router.get('usuarios.show', '/id2/:id', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuario.findOne({ where: { id: ctx.params.id } });
    ctx.status = 300;
    ctx.body = usuario;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
