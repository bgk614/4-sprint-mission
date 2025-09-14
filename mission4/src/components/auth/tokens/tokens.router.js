import express from 'express';

import { refreshAccessTokenController } from './tokens.controller.js';

export const tokenRouter = express.Router();

tokenRouter.route('/refresh').post(refreshAccessTokenController); // 토큰 재발급
