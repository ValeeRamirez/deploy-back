/**
 * @swagger
 * tags:
 *   name: Partidas
 *   description: API endpoints for managing partidas
 */

const Router = require('koa-router');

const router = new Router();

/**
 * @swagger
 * /partidas:
 *   post:
 *     summary: Create a new partida
 *     tags: [Partidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partida'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partida'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// crear partida
router.post('partidas.create', '/', async (ctx) => {
  try {
    const partida = await ctx.orm.Partida.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = partida;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /partidas:
 *   get:
 *     summary: Get all partidas
 *     tags: [Partidas]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partida'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// mostrar todos los partidaes
router.get('partidas.list', '/', async (ctx) => {
  try {
    const partidas = await ctx.orm.Partida.findAll();
    ctx.status = 200;
    ctx.body = partidas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /partidas/id/{id}:
 *   get:
 *     summary: Get partida by ID
 *     tags: [Partidas]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the partida
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partida'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// busca al partida por la primary key
router.get('partidas.findby', '/id/:id', async (ctx) => {
  try {
    const partidas = await ctx.orm.Partida.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = partidas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /partidas/creador/{creador}:
 *   get:
 *     summary: Get partidas by creator
 *     tags: [Partidas]
 *     parameters:
 *       - name: creador
 *         in: path
 *         description: Creador of the partida
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partida'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// busca todos los partidas con un creador determinado
router.get('partidas.show', '/creador/:creador', async (ctx) => {
  try {
    const partidas = await ctx.orm.Partida.findAll({ where: { creador: ctx.params.creador } });
    ctx.status = 200;
    ctx.body = partidas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /partidas/turno/{id}:
 *   get:
 *     summary: Get turno of partida by ID
 *     tags: [Partidas]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the partida
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 turno:
 *                   type: integer
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// busca el turno que esta la partida con su id
router.get('partidas.show', '/turno/:id', async (ctx) => {
  try {
    const partidas = await ctx.orm.Partida.findAll({
      where: { id: ctx.params.id },
      attributes: ['turno'],
    });
    ctx.status = 200;
    ctx.body = partidas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /partidas/ganador/{id}:
 *   get:
 *     summary: Get ganador of partida by ID
 *     tags: [Partidas]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the partida
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ganador:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// busca el ganador de una partida con su id
router.get('partidas.show', '/ganador/:id', async (ctx) => {
  try {
    const partidas = await ctx.orm.Partida.findAll({
      where: { id: ctx.params.id },
      attributes: ['ganador'],
    });
    ctx.status = 200;
    ctx.body = partidas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
