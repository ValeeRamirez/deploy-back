const Router = require('koa-router');

const router = new Router();

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

// //encontrar posicion de un partida por su id //No tiene
// router.get("partidas.show", "/posicion/:id", async (ctx) => {
//     try{
//         const partidas = await ctx.orm.partida.findAll({where :{id: ctx.params.id},
//         attributes: ["posicion"]});
//         ctx.status = 200;
//         ctx.body = partidas;
//     } catch(error){
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });
// //actualizar posicion de un partida con su id //No tiene
// router.put("partidas.update", "/posicion_update/:id", async (ctx) => {
//     try {
//         const { id } = ctx.params;

//         const partida = await ctx.orm.partida.findByPk(id);
//         if (!partida) {
//             ctx.status = 404;
//             ctx.body = { error: 'partida no encontrado' };
//             return;
//         }

//         const posicionAntigua = partida.posicion;
//         const [x, y] = posicionAntigua
//             .slice(1, -1) // Eliminar los paréntesis
//             .split(",") // Dividir las coordenadas
//             .map(coordenada => parseInt(coordenada)); // Convertir a números enteros

//         const nuevaPosicion = `(${x + 1},${y + 1})`; //aqui se le puede sumar lo que queramos

//         await partida.update({ posicion: nuevaPosicion });
//         ctx.status = 200;
//         ctx.body = { message: 'Posición del partida actualizada correctamente' };
//     } catch (error) {
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });

module.exports = router;
