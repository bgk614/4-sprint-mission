import swaggerUi from 'swagger-ui-express';
import express from 'express';
import dotenv from 'dotenv';
import { openapiSpecification } from '../swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { productRouter } from './product/product.routes.js';
import { articleRouter } from './article/article.routes.js';

dotenv.config();

const port = process.env.PORT;
export const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use('/products', productRouter);
app.use('/articles', articleRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`${port} 포트에서 서버 시작`);
});
