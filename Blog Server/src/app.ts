import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { postRouter } from './modules/post/post.router';
import { auth } from './lib/auth';
import config from './config';

const app: Application = express();

//* Middlewares
app.use(cors({
    origin: config.better_auth.app_url!,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World....!');
});

//* Routes
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api/posts", postRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        path: req.url,
        success: false,
        message: "Not Found!",
    });
});

export default app;