import { Context } from 'koa';

export const successWithMessage = (ctx: Context, message: string) => {
  ctx.status = 200;
  ctx.body = { message: message };
  return;
};

export const successWithData = (ctx: Context, data: any) => {
  ctx.status = 200;
  ctx.body = { data };
  return;
};

export const createdSuccessfully = (ctx: Context, data: any) => {
  ctx.status = 201;
  ctx.body = { data };
  return;
};

export const validationError = (ctx: Context, errors: { [key: string]: string }) => {
  ctx.status = 400;
  ctx.body = { errors };
  return;
};

export const notExist = (ctx: Context, message: string) => {
  ctx.status = 404;
  ctx.body = { message: message };
  return;
};

export const notAllowed = (ctx: Context, message: string) => {
  ctx.status = 403;
  ctx.body = { message: message };
  return;
};

export const unAuthorized = (ctx: Context, message: string) => {
    ctx.status = 401;
    ctx.body = { message: message };
    return;
};
