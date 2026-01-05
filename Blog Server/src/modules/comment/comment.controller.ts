import { Request, Response } from "express";
import { commentService } from "./comment.service";

const getCommentById = async (req: Request, res: Response) => {
    try {
        const result = await commentService.getCommentById(
            req.params.id as string
        );
        res.status(200).json({
            success: true,
            message: "Comment retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const getCommentByAuthorId = async (req: Request, res: Response) => {
    try {
        const result = await commentService.getCommentByAuthorId(
            req.params.authorId as string
        );
        res.status(200).json({
            success: true,
            message: "Comment retrieved successfully by author id",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const createComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        req.body.authorId = user?.id;
        const result = await commentService.createComment(req.body);
        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const deleteCommentById = async (req: Request, res: Response) => {
    try {
        const user = req?.user;
        const { commentId } = req.params;
        const result = await commentService.deleteCommentById(
            commentId as string,
            user?.id as string
        );
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const updateCommentById = async (req: Request, res: Response) => {
    try {
        const user = req?.user;
        const { commentId } = req.params;
        const result = await commentService.updateCommentById(
            commentId as string,
            user?.id as string,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

export const commentController = {
    getCommentById,
    getCommentByAuthorId,
    createComment,
    deleteCommentById,
    updateCommentById
};
