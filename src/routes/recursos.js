const Router = require('koa-router');
const { Jugador, Recurso } = require('../models');

const router = new Router();

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

// //encontrar posicion de un recurso por su id //No tiene
// router.get("recursos.show", "/posicion/:id", async (ctx) => {
//     try{
//         const recursos = await ctx.orm.recurso.findAll({where :{id: ctx.params.id},
//         attributes: ["posicion"]});
//         ctx.status = 200;
//         ctx.body = recursos;
//     } catch(error){
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });
// //actualizar posicion de un recurso con su id
// router.put("recursos.update", "/posicion_update/:id", async (ctx) => {
//     try {
//         const { id } = ctx.params;

//         const recurso = await ctx.orm.recurso.findByPk(id);
//         if (!recurso) {
//             ctx.status = 404;
//             ctx.body = { error: 'recurso no encontrado' };
//             return;
//         }

//         const posicionAntigua = recurso.posicion;
//         const [x, y] = posicionAntigua
//             .slice(1, -1) // Eliminar los paréntesis
//             .split(",") // Dividir las coordenadas
//             .map(coordenada => parseInt(coordenada)); // Convertir a números enteros

//         const nuevaPosicion = `(${x + 1},${y + 1})`; //aqui se le puede sumar lo que queramos

//         await recurso.update({ posicion: nuevaPosicion });
//         ctx.status = 200;
//         ctx.body = { message: 'Posición del recurso actualizada correctamente' };
//     } catch (error) {
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });

module.exports = router;
