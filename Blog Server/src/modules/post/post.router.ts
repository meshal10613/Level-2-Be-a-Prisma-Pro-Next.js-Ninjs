import { Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/", postController.getAllPosts);
router.get(
    "/my-posts",
    auth(UserRole.ADMIN, UserRole.USER),
    postController.getMyPost
);
router.get("/:id", postController.getPostById);

router.patch("/:postId", auth(UserRole.ADMIN, UserRole.USER), postController.updatePost);

router.post(
    "/",
    auth(UserRole.ADMIN, UserRole.USER),
    postController.createPost
);

export const postRouter: Router = router;
