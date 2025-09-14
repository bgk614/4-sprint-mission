import { createUserService } from './create-users.service.js';

export async function createUserController(req, res, next) {
  try {
    const { email, nickname, password } = req.body;
    const user = await createUserService(email, nickname, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
