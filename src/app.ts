import Koa from 'koa';
const cors = require('@koa/cors');
import bodyParser from 'koa-bodyparser';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';
import connectDB from './db';

dotenv.config();

const app = new Koa();

connectDB();

app.use(cors({
  origin: '*',
}));

app.use(bodyParser());
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err: any, ctx) => {
  console.error('Server error:', err);
  console.log('Error object:', err);
  ctx.status = err.statusCode || err.status || 500;
  ctx.body = { error: err.message };
});

export default app;

