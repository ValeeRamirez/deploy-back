/**
 * @swagger
 * tags:
 *   name: Tableros
 *   description: API endpoints for managing tableros
 */

const Router = require('koa-router');

const router = new Router();

/**
 * @swagger
 * /tableros:
 *   post:
 *     summary: Create a new tablero
 *     tags: [Tableros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tablero'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tablero'
 *       400:
 *         description: Bad Request
 */
// crear tablero
router.post('tableros.create', '/', async (ctx) => {
  try {
    const tablero = await ctx.orm.Tablero.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = tablero;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /tableros:
 *   get:
 *     summary: Get all tableros
 *     tags: [Tableros]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tablero'
 *       400:
 *         description: Bad Request
 */
// //mostrar todos los tableroes
router.get('tableros.list', '/', async (ctx) => {
  try {
    const tableros = await ctx.orm.Tablero.findAll();
    ctx.status = 200;
    ctx.body = tableros;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /tableros/id/{id}:
 *   get:
 *     summary: Get a tablero by its ID
 *     tags: [Tableros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tablero
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tablero'
 *       400:
 *         description: Bad Request
 */
// busca al tablero por la primary key
router.get('tableros.findby', '/id/:id', async (ctx) => {
  try {
    const tableros = await ctx.orm.Tablero.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = tableros;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /tableros/partida/{id_partida}:
 *   get:
 *     summary: Get all tableros in a partida
 *     tags: [Tableros]
 *     parameters:
 *       - in: path
 *         name: id_partida
 *         required: true
 *         description: ID of the partida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tablero'
 *       400:
 *         description: Bad Request
 */
// busca muestra los tableroes que estan en una partida con el id de la partida
router.get('tableros.show', '/partida/:id_partida', async (ctx) => {
  try {
    const tableros = await ctx.orm.Tablero.findAll({ where: { id_partida: ctx.params.id_partida } });
    ctx.status = 200;
    ctx.body = tableros;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
