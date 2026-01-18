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
router.get("/stats", auth(UserRole.ADMIN), postController.getStats);
router.get("/:id", postController.getPostById);

router.patch(
    "/:postId",
    auth(UserRole.ADMIN, UserRole.USER),
    postController.updatePost
);

router.post(
    "/",
    auth(UserRole.ADMIN, UserRole.USER),
    postController.createPost
);

router.delete(
    "/:postId",
    auth(UserRole.ADMIN, UserRole.USER),
    postController.deletePost
);

export const postRouter: Router = router;
