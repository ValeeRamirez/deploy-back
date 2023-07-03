const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');
const swagger = require('./swagger'); // Import the Swagger configuration

const app = new Koa();

app.context.orm = orm;
app.use(cors());
app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());

swagger(app); // Add the Swagger middleware

app.use((ctx, next) => {
  ctx.body = 'Hola Mundo! Saludos desde IIC2513';
});

module.exports = app;
