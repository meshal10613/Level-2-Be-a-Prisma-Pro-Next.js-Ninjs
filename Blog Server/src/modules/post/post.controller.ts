import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access!",
            });
        }
        const result = await postService.createPost(
            req.body,
            req.user.id as string
        );
        res.status(201).json({
            success: true,
            message: "Post created successfully",
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

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string | undefined;
        const tags = req.query.tags
            ? (req.query.tags as string).split(",")
            : [];
        const result = await postService.getAllPosts( search, tags );
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
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

export const postController = {
    createPost,
    getAllPosts,
};
