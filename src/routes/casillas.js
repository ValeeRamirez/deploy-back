/**
 * @swagger
 * tags:
 *   name: Casillas
 *   description: API endpoints for managing casillas
 */

const Router = require('koa-router');

const router = new Router();

/**
 * @swagger
 * /casillas:
 *   post:
 *     summary: Create a new casilla
 *     tags: [Casillas]
 *     requestBody:
 *       description: Casilla object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Casilla'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Casilla'
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
// crear casilla
router.post('casillas.create', '/', async (ctx) => {
  try {
    const casilla = await ctx.orm.Casilla.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = casilla;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /casillas:
 *   get:
 *     summary: Get all casillas
 *     tags: [Casillas]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Casilla'
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
// mostrar todas las casillaes
router.get('casillas.list', '/', async (ctx) => {
  try {
    const casillas = await ctx.orm.Casilla.findAll();
    ctx.status = 200;
    ctx.body = casillas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /casillas/id/{id}:
 *   get:
 *     summary: Get a casilla by ID
 *     tags: [Casillas]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the casilla
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Casilla'
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
// busca al casilla por la primary key
router.get('casillas.findby', '/id/:id', async (ctx) => {
  try {
    const casillas = await ctx.orm.Casilla.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = casillas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /casillas/tipo/{tipo}:
 *   get:
 *     summary: Get casillas by tipo
 *     tags: [Casillas]
 *     parameters:
 *       - name: tipo
 *         in: path
 *         description: Tipo of the casillas
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
 *                 $ref: '#/components/schemas/Casilla'
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
// busca todos los casillas con un tipo determinado
router.get('casillas.show', '/tipo/:tipo', async (ctx) => {
  try {
    const casillas = await ctx.orm.Casilla.findAll({ where: { tipo: ctx.params.tipo } });
    ctx.status = 200;
    ctx.body = casillas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});
/**
 * @swagger
 * /casillas/accion/{accion}:
 *   get:
 *     summary: Get casillas by accion
 *     tags: [Casillas]
 *     parameters:
 *       - name: accion
 *         in: path
 *         description: Accion of the casillas
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
 *                 $ref: '#/components/schemas/Casilla'
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
// busca todos los casillas con una accion determinada
router.get('casillas.show', '/accion/:accion', async (ctx) => {
  try {
    const casillas = await ctx.orm.Casilla.findAll({ where: { accion: ctx.params.accion } });
    ctx.status = 200;
    ctx.body = casillas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /casillas/casillas_tablero/{id_tablero}:
 *   get:
 *     summary: Get casillas by tablero ID
 *     tags: [Casillas]
 *     parameters:
 *       - name: id_tablero
 *         in: path
 *         description: ID of the tablero
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
 *                 $ref: '#/components/schemas/Casilla'
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
// busca muestra los casillas que estan en una tablero con el id de la tablero
router.get('casillas.show', '/casillas_tablero/:id_tablero', async (ctx) => {
  try {
    const casillas = await ctx.orm.Casilla.findAll({ where: { id_tablero: ctx.params.id_tablero } });
    ctx.status = 200;
    ctx.body = casillas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});
/**
 * @swagger
 * /casillas/coordenadas/{id}:
 *   get:
 *     summary: Get the coordinates of a casilla by ID
 *     tags: [Casillas]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the casilla
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
 *                 type: string
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

// encontrar coordenadas de un casilla por su id //si
router.get('casillas.show', '/coordenadas/:id', async (ctx) => {
  try {
    const casillas = await ctx.orm.Casilla.findAll({
      where: { id: ctx.params.id },
      attributes: ['coordenadas'],
    });
    ctx.status = 200;
    ctx.body = casillas;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
