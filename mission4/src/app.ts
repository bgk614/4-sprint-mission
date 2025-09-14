import express from 'express';
import { authRouter } from './components/auth/auth.routes.js';
import { userRouter } from './components/user/user.routes.js';
import { productRouter } from './components/product/product.routes.js';
import { articleRouter } from './components/article/article.routes.js';
import { commentRouter } from './components/comment/comment.routes.js';
import { likeRouter } from './components/like/like.routes.js';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/likes', likeRouter);

export default app;
