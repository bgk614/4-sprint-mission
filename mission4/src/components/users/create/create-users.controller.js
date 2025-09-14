import { createUserService } from './create-users.service.js';

export async function createUserController(req, res, next) {
  try {
    const { email, nickname, password, image } = req.body;
    const user = await createUserService(email, nickname, password, image);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
