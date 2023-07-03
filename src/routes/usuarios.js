/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API endpoints for managing usuarios
 */

const Router = require('koa-router');

const router = new Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Get all usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Bad Request
 */
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

/**
 * @swagger
 * /usuarios/id/{id}:
 *   get:
 *     summary: Get a usuario by its ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Bad Request
 */
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

/**
 * @swagger
 * /usuarios/id2/{id}:
 *   get:
 *     summary: Get a usuario by its ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the usuario
 *         schema:
 *           type: integer
 *     responses:
 *       300:
 *         description: Multiple Choices
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Bad Request
 */
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
