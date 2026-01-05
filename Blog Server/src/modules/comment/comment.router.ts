import { Router } from "express";
import { commentController } from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/:id", commentController.getCommentById);
router.get("/author/:authorId", commentController.getCommentByAuthorId);

router.post(
    "/",
    auth(UserRole.ADMIN, UserRole.USER),
    commentController.createComment
);

router.delete(
    "/:commentId",
    auth(UserRole.ADMIN, UserRole.USER),
    commentController.deleteCommentById
);

router.patch(
    "/:commentId",
    auth(UserRole.ADMIN, UserRole.USER),
    commentController.updateCommentById
);

export const commentRouter: Router = router;
