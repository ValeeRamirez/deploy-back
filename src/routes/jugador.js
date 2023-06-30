const Router = require('koa-router');
const { Casilla } = require('../models');
const { Recurso } = require('../models');

const router = new Router();

// crear jugador
router.post('jugadors.create', '/', async (ctx) => {
  try {
    const jugador = await ctx.orm.Jugador.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = usuario;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

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
// //actualizar posicion de un jugador con su id
// router.put("jugadors.update", "/posicion_update/:id", async (ctx) => {
//     try {
//         const { id } = ctx.params;

//         const jugador = await ctx.orm.Jugador.findByPk(id);
//         if (!jugador) {
//             ctx.status = 404;
//             ctx.body = { error: 'Jugador no encontrado' };
//             return;
//         }

//         const posicionAntigua = jugador.posicion;
//         const [x, y] = posicionAntigua
//             .slice(1, -1) // Eliminar los paréntesis
//             .split(",") // Dividir las coordenadas
//             .map(coordenada => parseInt(coordenada)); // Convertir a números enteros

//         const nuevaPosicion = `(${x + 1},${y + 1})`; //aqui se le puede sumar lo que queramos

//         await jugador.update({ posicion: nuevaPosicion });
//         ctx.status = 200;
//         ctx.body = { message: 'Posición del jugador actualizada correctamente' };
//     } catch (error) {
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });

// INTENTANDO ACTUALIZAR POSICION CON RECURSOS

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

module.exports = router;
