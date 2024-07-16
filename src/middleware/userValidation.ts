import { Context, Next } from 'koa';
import { RegisterRequestBody, LoginRequestBody } from '../interfaces/UserInterfaces';
import * as response from '../utils/response';

export const validateRegisterBody = async (ctx: Context, next: Next) => {
  const { name, email, password } = ctx.request.body as RegisterRequestBody;
  const errors: { [key: string]: string } = {};

  if (!name || name.length < 2) {
    errors['name'] = 'Name must be presented and at least 2 characters long';
  }

  if (!email || !isValidEmail(email)) {
    errors['email'] = 'Invalid email format';
  }

  if (!password || password.length < 4) {
    errors['password'] = 'Password must be presented and at least 4 characters long';
  }

  if (Object.keys(errors).length > 0) {
    return response.validationError(ctx, errors);
  }

  await next();
};

export const validateLoginBody = async (ctx: Context, next: Next) => {
    const { email, password} = ctx.request.body as LoginRequestBody;
    const errors: { [key: string]: string } = {};

  if (!email) {
    errors['email'] = 'email is required';
  } else if (!isValidEmail(email)) {
    errors['email'] = 'Invalid email format';
  }

  if (!password) {
    errors['password'] = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return response.validationError(ctx, errors);
  }

  await next();
}

function isValidEmail(email: string): boolean {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
  return regex.test(email);
}
