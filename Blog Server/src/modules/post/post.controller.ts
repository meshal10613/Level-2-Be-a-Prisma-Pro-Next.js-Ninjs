import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationAndSorting from "../../helper/pagination_sorting.helper";

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
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === "true"
                ? true
                : req.query.isFeatured === "false"
                ? false
                : undefined
            : undefined;
        const status = req.query.status as PostStatus | undefined;

        const { page, limit, skip, sortBy, sortOrder } = paginationAndSorting(
            req.query
        );

        const result = await postService.getAllPosts({
            search,
            tags,
            isFeatured,
            status,
            page,
            limit,
            skip,
            sortBy,
            sortOrder,
        });
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            ...result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        const result = await postService.getPostById(req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: result,
        })
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
    getPostById
};
