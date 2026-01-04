import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async(req: Request, res: Response) => {
	try {
		const result = await commentService.createComment(req.body);
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
			error: error,
		})
	}
};

export const commentController = {
	createComment
};