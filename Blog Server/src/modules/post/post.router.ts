import { NextFunction, Request, Response, Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post(
    "/",
    auth(UserRole.ADMIN, UserRole.USER),
    postController.createPost
);

export const postRouter: Router = router;
