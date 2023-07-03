/**
 * @swagger
 * tags:
 *   name: Recursos
 *   description: API endpoints for managing recursos
 */

const Router = require('koa-router');
const { Jugador, Recurso } = require('../models');

const router = new Router();

// Create a new recurso
/**
 * @swagger
 * /recursos/crear:
 *   post:
 *     tags:
 *       - Recursos
 *     summary: Create a new recurso
 *     requestBody:
 *       description: Recurso object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recurso'
 *       '400':
 *         description: Bad Request
 */
// crear recurso
router.post('recursos.create', '/crear', async (ctx) => {
  try {
    const recurso = await ctx.orm.Recurso.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = usuario;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// Get all recursos
/**
 * @swagger
 * /recursos:
 *   get:
 *     tags:
 *       - Recursos
 *     summary: Get all recursos
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recurso'
 *       '400':
 *         description: Bad Request
 */
// mostrar todos los recursoes
router.get('recursos.list', '/', async (ctx) => {
  try {
    const recursos = await ctx.orm.Recurso.findAll();
    ctx.status = 200;
    ctx.body = recursos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// Get a recurso by ID
/**
 * @swagger
 * /recursos/id/{id}:
 *   get:
 *     tags:
 *       - Recursos
 *     summary: Get a recurso by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recurso
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recurso'
 *       '400':
 *         description: Bad Request
 */
// busca al recurso por la primary key
router.get('recursos.findby', '/id/:id', async (ctx) => {
  try {
    const recursos = await ctx.orm.Recurso.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = recursos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// Get all recursos of a specific type
/**
 * @swagger
 * /recursos/tipo/{tipo}:
 *   get:
 *     tags:
 *       - Recursos
 *     summary: Get all recursos of a specific type
 *     parameters:
 *       - name: tipo
 *         in: path
 *         required: true
 *         description: Type of the recurso
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
 *                 $ref: '#/components/schemas/Recurso'
 *       '400':
 *         description: Bad Request
 */
// busca todos los recursoes con un tipo determinado
router.get('recursos.show', '/tipo/:tipo', async (ctx) => {
  try {
    const recursos = await ctx.orm.Recurso.findAll({ where: { tipo: ctx.params.tipo } });
    ctx.status = 200;
    ctx.body = recursos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// Get all recursos of a jugador by jugador ID
/**
 * @swagger
 * /recursos/jugador/{id_jugador}:
 *   get:
 *     tags:
 *       - Recursos
 *     summary: Get all recursos of a jugador by jugador ID
 *     parameters:
 *       - name: id_jugador
 *         in: path
 *         required: true
 *         description: ID of the jugador
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
 *                 $ref: '#/components/schemas/Recurso'
 *       '400':
 *         description: Bad Request
 */
// muestra los recursos que son de un jugador con su id
router.get('recursos.show', '/jugador/:id_jugador', async (ctx) => {
  try {
    const recursos = await ctx.orm.Recurso.findAll({ where: { id_jugador: ctx.params.id_jugador } });
    ctx.status = 200;
    ctx.body = recursos;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// Count the number of recursos for a jugador
/**
 * @swagger
 * /recursos/jugadores_cantidad/{id}:
 *   get:
 *     tags:
 *       - Recursos
 *     summary: Count the number of recursos for a jugador
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the jugador
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
 *                 recursos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tipo:
 *                         type: string
 *                       cantidad:
 *                         type: integer
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Jugador not found
 *       '500':
 *         description: Internal Server Error
 */
// Ruta para contar los recursos de un jugador
router.get('recursos.countByPlayer', '/jugadores_cantidad/:id', async (ctx) => {
  try {
    const jugadorId = ctx.params.id;

    // Buscar el jugador por su ID
    const jugador = await Jugador.findByPk(jugadorId);

    if (!jugador) {
      ctx.status = 404;
      ctx.body = { mensaje: 'Jugador no encontrado' };
      return;
    }

    // Contar los recursos agrupados por tipo
    const recursos = await Recurso.findAll({
      where: { id_jugador: jugadorId },
      attributes: ['tipo', [ctx.orm.sequelize.fn('COUNT', ctx.orm.sequelize.col('tipo')), 'cantidad']],
      group: ['tipo'],
    });

    ctx.status = 200;
    ctx.body = { recursos };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al contar los recursos del jugador' };
  }
});

module.exports = router;
