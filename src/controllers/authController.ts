import { Context } from 'koa';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterRequestBody, LoginRequestBody } from '../interfaces/UserInterfaces';
import * as response from '../utils/response';
import { JWT_SECRET } from '../config/config';

export const register = async (ctx: Context) => {
  const { name, email, password } = ctx.request.body as RegisterRequestBody;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '12h' });

    return response.createdSuccessfully(ctx, {token, userId: newUser._id, isAdmin: false});
  } catch (err) {
    return response.validationError(ctx, {'email': 'Email or username already exists'});
  }
};

export const login = async (ctx: Context) => {
    const { email, password } = ctx.request.body as LoginRequestBody;
    const user = await User.findOne({ email });
  
    if (!user) {
      return response.validationError(ctx, {'email': 'Invalid Credentials'});
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
  
    if (!validPassword) {
      return response.validationError(ctx, {'email': 'Invalid Credentials'});
    }
  
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return response.successWithData(ctx, {token, userId: user._id, isAdmin: user.isAdmin});
};
