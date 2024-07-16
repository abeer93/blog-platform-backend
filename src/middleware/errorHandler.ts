import { Context, Next } from 'koa';

export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next(); // Pass the request to the next middleware or route handler
  } catch (err: any) { // Specify 'any' if the type of 'err' is not clear
    ctx.status = err.statusCode || err.status || 500; // Set HTTP status code
    ctx.body = {
      error: err.message // Set response body with error message
    };
    // Optionally log the error for debugging purposes
    console.error('Error:', err);
  }
};
