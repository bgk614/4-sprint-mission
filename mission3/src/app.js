import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './middlewares/errorHandler.js';
import { productRouter } from './product/product.routes.js';
import { articleRouter } from './article/article.routes.js';
import { commentRouter } from './comment/comment.routes.js';
import { uploadRouter } from './shared/uploads.routes.js';

import swaggerDocument from './docs/openapi-resolved.json' with { type: 'json' };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;
swaggerDocument.servers = swaggerDocument.servers.map((server) => {
  if (server.url === 'SERVER_URL') {
    return { ...server, url: SERVER_URL };
  }
  return server;
});

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/uploads', uploadRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버 시작`);
});
