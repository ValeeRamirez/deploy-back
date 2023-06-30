const Router = require('koa-router');

const router = new Router();

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

// //actualizar coordenadas de un casilla con su id
// router.put("casillas.update", "/posicion_update/:id", async (ctx) => {
//     try {
//         const { id } = ctx.params;

//         const casilla = await ctx.orm.casilla.findByPk(id);
//         if (!casilla) {
//             ctx.status = 404;
//             ctx.body = { error: 'casilla no encontrado' };
//             return;
//         }

//         const posicionAntigua = casilla.posicion;
//         const [x, y] = posicionAntigua
//             .slice(1, -1) // Eliminar los paréntesis
//             .split(",") // Dividir las coordenadas
//             .map(coordenada => parseInt(coordenada)); // Convertir a números enteros

//         const nuevaPosicion = `(${x + 1},${y + 1})`; //aqui se le puede sumar lo que queramos

//         await casilla.update({ posicion: nuevaPosicion });
//         ctx.status = 200;
//         ctx.body = { message: 'Posición del jugador actualizada correctamente' };
//     } catch (error) {
//         ctx.status = 400;
//         ctx.body = error;
//     }
// });

module.exports = router;
