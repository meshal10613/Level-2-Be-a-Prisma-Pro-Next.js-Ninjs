import { Router } from "express";
import { commentController } from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

//? GET
router.get("/:id", commentController.getCommentById);
router.get("/author/:authorId", commentController.getCommentByAuthorId);

//? POST
router.post(
    "/",
    auth(UserRole.ADMIN, UserRole.USER),
    commentController.createComment
);

//? DELETE
router.delete(
    "/:commentId",
    auth(UserRole.ADMIN, UserRole.USER),
    commentController.deleteCommentById
);

//? PATCH
router.patch(
    "/:commentId",
    auth(UserRole.ADMIN, UserRole.USER),
    commentController.updateCommentById
);

router.patch(
    "/:commentId/moderate",
    auth(UserRole.ADMIN),
    commentController.moderateComment
);

export const commentRouter: Router = router;
