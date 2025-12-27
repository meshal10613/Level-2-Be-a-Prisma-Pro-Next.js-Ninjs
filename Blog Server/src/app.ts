import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
import { postRouter } from './modules/post/post.router';

const app: Application = express();

//* Middlewares
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World....!');
});

//* Routes
app.use("/api/v1/posts", postRouter);

export default app;