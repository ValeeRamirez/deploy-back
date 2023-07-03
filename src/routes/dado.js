/**
 * @swagger
 * tags:
 *   name: Dado
 *   description: API endpoints for managing dados
 */

const Router = require('koa-router');
const { Casilla } = require('../models');
const { Recurso } = require('../models');

const router = new Router();

/**
 * @swagger
 * /dados:
 *   get:
 *     summary: Get all dados
 *     tags: [Dados]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dado'
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
// mostrar todos los dados
router.get('dados.list', '/', async (ctx) => {
  try {
    const dados = await ctx.orm.Dado.findAll();
    ctx.status = 200;
    ctx.body = dados;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /dados/lanzar_dado/{id}:
 *   put:
 *     summary: Update dado by ID and roll it
 *     tags: [Dados]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the dado
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
 *                 message:
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
// actualizar dado por su id partida
router.put('dado.update', '/lanzar_dado/:id', async (ctx) => {
  try {
    const { id } = ctx.params;

    const dado = await ctx.orm.Dado.findByPk(id);

    const { caras } = dado;

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const nuevaPosicion = getRandomInt(1, caras); // Aquí se le puede sumar lo que queramos

    // Actualizar la posición del jugador
    await dado.update({ resultado: nuevaPosicion });

    ctx.status = 200;
    ctx.body = { message: `Dado lanzado, número obtenido: ${nuevaPosicion}` };
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
