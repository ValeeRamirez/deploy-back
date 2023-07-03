/**
 * @swagger
 * tags:
 *   name: Jugador
 *   description: API endpoints for managing jugadores
 */

const Router = require('koa-router');
const { Casilla } = require('../models');
const { Recurso } = require('../models');

const router = new Router();

/**
 * @swagger
 * /jugadors:
 *   post:
 *     summary: Create a new jugador
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jugador'
 *     responses:
 *       '201':
 *         description: Created
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
// crear jugador
router.post('jugadors.create', '/', async (ctx) => {
  try {
    const jugador = await ctx.orm.Jugador.create(ctx.request.body);
    const jugadorId = jugador.id; // Retrieve the ID of the created jugador
    ctx.status = 201;
    ctx.body = { id: jugadorId }; // Return the ID in the response body
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /jugadors:
 *   get:
 *     summary: Get all jugadores
 *     tags: [Jugadores]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jugador'
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
// mostrar todos los jugadores
router.get('jugadors.list', '/', async (ctx) => {
  try {
    const jugadors = await ctx.orm.Jugador.findAll();
    ctx.status = 200;
    ctx.body = jugadors;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});
/**
 * @swagger
 * /jugadors/id/{id}:
 *   get:
 *     summary: Get jugador by ID
 *     tags: [Jugadores]
 *     parameters:
 *       - name: id
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
// busca al jugador por la primary key
router.get('jugadors.findby', '/id/:id', async (ctx) => {
  try {
    const jugadors = await ctx.orm.Jugador.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = jugadors;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /jugadors/tipo/{tipo}:
 *   get:
 *     summary: Get jugadores by tipo
 *     tags: [Jugadores]
 *     parameters:
 *       - name: tipo
 *         in: path
 *         description: Tipo of the jugadores
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
 *                 $ref: '#/components/schemas/Jugador'
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
// busca todos los jugadores con un tipo determinado
router.get('jugadors.show', '/tipo/:tipo', async (ctx) => {
  try {
    const jugadors = await ctx.orm.Jugador.findAll({ where: { tipo: ctx.params.tipo } });
    ctx.status = 200;
    ctx.body = jugadors;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /jugadors/jugadores_partida/{id_partida}:
 *   get:
 *     summary: Get jugadores by partida ID
 *     tags: [Jugadores]
 *     parameters:
 *       - name: id_partida
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jugador'
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
// busca muestra los jugadores que estan en una partida con el id de la partida
router.get('jugadors.show', '/jugadores_partida/:id_partida', async (ctx) => {
  try {
    const jugadors = await ctx.orm.Jugador.findAll({ where: { id_partida: ctx.params.id_partida } });
    ctx.status = 200;
    ctx.body = jugadors;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /jugadors/posicion/{id}:
 *   get:
 *     summary: Get jugador position by ID
 *     tags: [Jugadores]
 *     parameters:
 *       - name: id
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
// encontrar posicion de un jugador por su id
router.get('jugadors.show', '/posicion/:id', async (ctx) => {
  try {
    const jugadors = await ctx.orm.Jugador.findAll({
      where: { id: ctx.params.id },
      attributes: ['posicion'],
    });
    ctx.status = 200;
    ctx.body = jugadors;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /jugadors/posicion_update/{id}:
 *   put:
 *     summary: Update jugador position by ID and handle casilla actions
 *     tags: [Jugadores]
 *     parameters:
 *       - name: id
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
// actualizar posicion de un jugador con su id
router.put('jugador.update', '/posicion_update/:id', async (ctx) => {
  try {
    const { id } = ctx.params;

    const jugador = await ctx.orm.Jugador.findByPk(id);
    if (!jugador) {
      ctx.status = 404;
      ctx.body = { error: 'Jugador no encontrado' };
      return;
    }

    const posicionAntigua = jugador.posicion;
    const [x, y] = posicionAntigua
      .slice(1, -1) // Eliminar los paréntesis
      .split(',') // Dividir las coordenadas
      .map((coordenada) => parseInt(coordenada)); // Convertir a números enteros

    //   //estaba probando esto:
    //   x_1 = random(1, 3);
    //   y_1 = random(1, 3);
    //   const nuevaPosicion = `(${x + x_1},${y + y_1})`; // Aquí se le puede sumar lo que queramos

    const nuevaPosicion = `(${x + 1},${y + 1})`; // Aquí se le puede sumar lo que queramos

    // Buscar la casilla en la nueva posición
    const casilla = await ctx.orm.Casilla.findOne({ where: { coordenadas: nuevaPosicion } });

    // Actualizar la posición del jugador
    await jugador.update({ posicion: nuevaPosicion });

    // Verificar si hay una casilla en la nueva posición
    if (casilla) {
      const { accion, tipo } = casilla;

      if (accion === 'Recolectar' || accion === 'Robar') {
        // Agregar recurso al jugador
        await ctx.orm.Recurso.create({
          tipo,
          id_jugador: jugador.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else if (accion === 'Perder') {
        // Buscar y eliminar recurso del jugador
        const recurso = await ctx.orm.Recurso.findOne({ where: { tipo, id_jugador: jugador.id } });
        if (recurso) {
          await recurso.destroy();
        }
      }
    }

    ctx.status = 200;
    ctx.body = { message: 'Posición del jugador actualizada correctamente' };
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

/**
 * @swagger
 * /jugadors/posicion_update/{id_jugador}/{coordenadas}:
 *   put:
 *     summary: Update jugador position by coordenadas and handle casilla actions
 *     tags:
 *       - Jugadores
 *     parameters:
 *       - name: id_jugador
 *         in: path
 *         description: ID of the jugador
 *         required: true
 *         schema:
 *           type: string
 *       - name: coordenadas
 *         in: path
 *         description: Coordenadas of the jugador (e.g., "(x,y)")
 *         required: true
 *         schema:
 *           type: string
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
// actualizar posicion de un jugador con sus coordenadas
router.put('jugador.update', '/posicion_update/:id_jugador/:coordenadas', async (ctx) => {
  try {
    const { id_jugador, coordenadas } = ctx.params;

    const jugador = await ctx.orm.Jugador.findOne({ where: { id: id_jugador } });
    if (!jugador) {
      ctx.status = 404;
      ctx.body = { error: 'Jugador no encontrado' };
      return;
    }

    const posicion = coordenadas;
    const [x, y] = posicion
      .slice(1, -1) // Eliminar los paréntesis
      .split(','); // Dividir las coordenadas // Convertir a números enteros

    //   //estaba probando esto:
    //   x_1 = random(1, 3);
    //   y_1 = random(1, 3);
    //   const nuevaPosicion = `(${x + x_1},${y + y_1})`; // Aquí se le puede sumar lo que queramos

    const nuevaPosicion = `(${x},${y})`; // Aquí se le puede sumar lo que queramos

    // Buscar la casilla en la nueva posición
    const casilla = await ctx.orm.Casilla.findOne({ where: { coordenadas: nuevaPosicion } });

    // Actualizar la posición del jugador
    await jugador.update({ posicion: nuevaPosicion });

    // Verificar si hay una casilla en la nueva posición
    if (casilla) {
      const { accion, tipo } = casilla;

      if (accion === 'Recolectar' || accion === 'Robar') {
        // Agregar recurso al jugador
        await ctx.orm.Recurso.create({
          tipo,
          id_jugador: jugador.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else if (accion === 'Perder') {
        // Buscar y eliminar recurso del jugador
        const recurso = await ctx.orm.Recurso.findOne({ where: { tipo, id_jugador: jugador.id } });
        if (recurso) {
          await recurso.destroy();
        }
      }
    }

    ctx.status = 200;
    ctx.body = { message: 'Posición del jugador actualizada correctamente' };
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});
module.exports = router;
