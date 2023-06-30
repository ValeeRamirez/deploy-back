const Router = require('koa-router');

const router = new Router();

// crear barco // si
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

// mostrar todas las barcos // si
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

// busca al barco por la primary key //si
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
// busca todos los barcos con un tipo determinado // si
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
// busca todos los barcos de un id_jugador determinado
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

// busca los datos del jugador que es dueño un barco con un id determinado
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
// //busca todos los barcos con una accion determinada // Barcos no tiene acción
// router.get("barcos.show", "/accion/:accion", async (ctx) => {
//     try{
//         const barcos = await ctx.orm.Barco.findAll({where :{accion: ctx.params.accion}});
//         ctx.status = 200;
//         ctx.body = barcos;
//     } catch(error){
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });

// //busca muestra los barcos que estan en una tablero con el id de la tablero // Barcos no tiene id_tablero
// router.get("barcos.show", "/barcos_tablero/:id_tablero", async (ctx) => {
//     try{
//         const barcos = await ctx.orm.Barco.findAll({where :{id_tablero: ctx.params.id_tablero}});
//         ctx.status = 200;
//         ctx.body = barcos;
//     } catch(error){
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });

// encontrar posicion de un barco por su id // si
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

// //actualizar coordenadas de un barco con su id
// router.put("barcos.update", "/posicion_update/:id", async (ctx) => {
//     try {
//         const { id } = ctx.params;

//         const barco = await ctx.orm.barco.findByPk(id);
//         if (!barco) {
//             ctx.status = 404;
//             ctx.body = { error: 'barco no encontrado' };
//             return;
//         }

//         const posicionAntigua = barco.posicion;
//         const [x, y] = posicionAntigua
//             .slice(1, -1) // Eliminar los paréntesis
//             .split(",") // Dividir las coordenadas
//             .map(coordenada => parseInt(coordenada)); // Convertir a números enteros

//         const nuevaPosicion = `(${x + 1},${y + 1})`; //aqui se le puede sumar lo que queramos

//         await barco.update({ posicion: nuevaPosicion });
//         ctx.status = 200;
//         ctx.body = { message: 'Posición del jugador actualizada correctamente' };
//     } catch (error) {
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });

module.exports = router;
