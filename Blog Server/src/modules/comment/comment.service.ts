import { title } from "node:process";
import { prisma } from "../../lib/prisma";
import { CommentStatus } from "../../../generated/prisma/enums";

const getCommentById = async (id: string) => {
    return await prisma.comment.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true,
                },
            },
        },
    });
};

const getCommentByAuthorId = async (authorId: string) => {
    return await prisma.comment.findMany({
        where: {
            authorId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true,
                },
            },
        },
    });
};

const createComment = async (payload: {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string;
}) => {
    //? check the post is exist or not
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId,
        },
    });

    //? check the parent comment is exist or not
    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId,
            },
        });
    }

    return await prisma.comment.create({
        data: payload,
    });
};

const deleteCommentById = async (commentId: string, authorId: string) => {
    const commentData = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId,
            authorId,
        },
        select: {
            id: true,
        },
    });

    if (!commentData) {
        throw new Error("You are not authorized to delete this comment");
    }

    return await prisma.comment.delete({
        where: {
            id: commentData.id,
        },
    });
};

const updateCommentById = async (
    commentId: string,
    authorId: string,
    data: {
        content?: string;
        status?: CommentStatus;
    }
) => {
    const commentData = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId,
            authorId,
        },
        select: {
            id: true,
        },
    });

    if (!commentData) {
        throw new Error("You are not authorized to delete this comment");
    }

    return await prisma.comment.update({
        where: {
            id: commentData.id,
            authorId,
        },
        data,
    });
};

const moderateComment = async (
    commentId: string,
    data: { status: CommentStatus }
) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
        },
    });

    return await prisma.comment.update({
        where: {
            id: commentData.id,
        },
        data
    })
};

export const commentService = {
    getCommentById,
    getCommentByAuthorId,
    createComment,
    deleteCommentById,
    updateCommentById,
    moderateComment,
};
