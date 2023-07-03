/**
 * @swagger
 * tags:
 *   name: Barcos
 *   description: API endpoints for managing barcos
 */

const Router = require('koa-router');

const router = new Router();

/**
 * @swagger
 * /barcos:
 *   post:
 *     summary: Create a new barco
 *     tags: [Barcos]
 *     requestBody:
 *       description: Barco object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/barco'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barco'
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
router.post('barcos.create', '/', async (ctx) => {
  try {
    const barco = await ctx.orm.Barco.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = barco;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /barcos:
 *   get:
 *     summary: Get all barcos
 *     tags: [Barcos]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Barco'
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
router.get('barcos.list', '/', async (ctx) => {
  try {
    const barcos = await ctx.orm.Barco.findAll();
    ctx.status = 200;
    ctx.body = barcos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /barcos/id/{id}:
 *   get:
 *     summary: Get a barco by ID
 *     tags: [Barcos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the barco
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barco'
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
router.get('barcos.findby', '/id/:id', async (ctx) => {
  try {
    const barcos = await ctx.orm.Barco.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = barcos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /barcos/tipo/{tipo}:
 *   get:
 *     summary: Get barcos by tipo
 *     tags: [Barcos]
 *     parameters:
 *       - name: tipo
 *         in: path
 *         description: Tipo of the barcos
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
 *                 $ref: '#/components/schemas/Barco'
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
router.get('barcos.show', '/tipo/:tipo', async (ctx) => {
  try {
    const barcos = await ctx.orm.Barco.findAll({ where: { tipo: ctx.params.tipo } });
    ctx.status = 200;
    ctx.body = barcos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /barcos/jugador/{id_jugador}:
 *   get:
 *     summary: Get barcos by id_jugador
 *     tags: [Barcos]
 *     parameters:
 *       - name: id_jugador
 *         in: path
 *         description: ID of the jugador
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Barco'
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
router.get('barcos.show', '/jugador/:id_jugador', async (ctx) => {
  try {
    const barcos = await ctx.orm.Barco.findAll({ where: { id_jugador: ctx.params.id_jugador } });
    ctx.status = 200;
    ctx.body = barcos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /barcos/jugador_dueno/{id}:
 *   get:
 *     summary: Get the jugador who owns the barco
 *     tags: [Barcos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the barco
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jugador'
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
router.get('barcos.show', '/jugador_dueno/:id', async (ctx) => {
  const barco = await ctx.orm.Barco.findByPk(ctx.params.id);
  try {
    if (barco) {
      const jugadorDueno = await barco.getJugadorDueno();
      if (jugadorDueno) {
        ctx.body = jugadorDueno; // Datos del jugador
      }
    }
    ctx.status = 200;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /barcos/posicion/{id}:
 *   get:
 *     summary: Get the position of a barco by ID
 *     tags: [Barcos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the barco
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   posicion:
 *                     type: string
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
router.get('barcos.show', '/posicion/:id', async (ctx) => {
  try {
    const barcos = await ctx.orm.Barco.findAll({
      where: { id: ctx.params.id },
      attributes: ['posicion'],
    });
    ctx.status = 200;
    ctx.body = barcos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// Define your other routes for barcos here using the Swagger annotations

module.exports = router;
