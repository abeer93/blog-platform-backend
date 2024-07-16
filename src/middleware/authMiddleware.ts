import { Context, Next } from 'koa';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';
import { JwtPayload } from '../interfaces/jwtPayload';
import * as response from '../utils/response';

export const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization?.split(' ')[1];
  if (!token) {
    return response.unAuthorized(ctx, 'Access denied');
  }

  try {
    const decoded = await verifyToken(token) as JwtPayload;

    const user = await User.findById(decoded.id);
    
    if (!user) {
        return response.notExist(ctx, 'User not found.');
    }

    ctx.state.user = user;

    await next();
  } catch (err) {
    return response.unAuthorized(ctx, 'Access denied');
  }
};
