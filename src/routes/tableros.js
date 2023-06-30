const Router = require('koa-router');

const router = new Router();

// crear tablero
router.post('tableros.create', '/', async (ctx) => {
  try {
    const tablero = await ctx.orm.Tablero.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = tablero;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// //mostrar todos los tableroes
router.get('tableros.list', '/', async (ctx) => {
  try {
    const tableros = await ctx.orm.Tablero.findAll();
    ctx.status = 200;
    ctx.body = tableros;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// busca al tablero por la primary key
router.get('tableros.findby', '/id/:id', async (ctx) => {
  try {
    const tableros = await ctx.orm.Tablero.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = tableros;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// busca muestra los tableroes que estan en una partida con el id de la partida
router.get('tableros.show', '/partida/:id_partida', async (ctx) => {
  try {
    const tableros = await ctx.orm.Tablero.findAll({ where: { id_partida: ctx.params.id_partida } });
    ctx.status = 200;
    ctx.body = tableros;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// // //encontrar posicion de un tablero por su id //No tiene
// // router.get("tableros.show", "/posicion/:id", async (ctx) => {
// //     try{
// //         const tableros = await ctx.orm.tablero.findAll({where :{id: ctx.params.id},
// //         attributes: ["posicion"]});
// //         ctx.status = 200;
// //         ctx.body = tableros;
// //     } catch(error){
// //         ctx.status = 400;
// //         ctx.body = error;
// //     }
// // });

// // //actualizar posicion de un tablero con su id //No tiene
// // router.put("tableros.update", "/posicion_update/:id", async (ctx) => {
// //     try {
// //         const { id } = ctx.params;

// //         const tablero = await ctx.orm.tablero.findByPk(id);
// //         if (!tablero) {
// //             ctx.status = 404;
// //             ctx.body = { error: 'tablero no encontrado' };
// //             return;
// //         }

// //         const posicionAntigua = tablero.posicion;
// //         const [x, y] = posicionAntigua
// //             .slice(1, -1) // Eliminar los paréntesis
// //             .split(",") // Dividir las coordenadas
// //             .map(coordenada => parseInt(coordenada)); // Convertir a números enteros

// //         const nuevaPosicion = `(${x + 1},${y + 1})`; //aqui se le puede sumar lo que queramos

// //         await tablero.update({ posicion: nuevaPosicion });
// //         ctx.status = 200;
// //         ctx.body = { message: 'Posición del tablero actualizada correctamente' };
// //     } catch (error) {
// //         ctx.status = 400;
// //         ctx.body = error;
// //     }
// // });

module.exports = router;
