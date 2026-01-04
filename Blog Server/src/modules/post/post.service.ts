import { includes } from "zod";
import { CommentStatus, Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
    data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
    userId: string
) => {
    const result = await prisma.post.create({
        data: { ...data, authorId: userId },
    });
    return result;
};

const getAllPosts = async ({
    search,
    tags,
    isFeatured,
    status,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
}: {
    search: string | undefined;
    tags: string[] | [];
    isFeatured?: boolean | undefined;
    status?: PostStatus | undefined;
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
}) => {
    const andConditions: PostWhereInput[] = [];
    if (search) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    content: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    tags: {
                        has: search as string,
                    },
                },
            ],
        });
    }

    if (tags.length > 0) {
        andConditions.push({
            tags: {
                hasEvery: tags as string[],
            },
        });
    }

    if (typeof isFeatured === "boolean") {
        andConditions.push({
            isFeatured,
        });
    }

    if (status === "DRAFT" || status === "PUBLISHED" || status === "ARCHIVED") {
        andConditions.push({
            status,
        });
    }

    const result = await prisma.post.findMany({
        take: limit,
        skip: skip,
        where: {
            AND: andConditions,
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
    });

    const totalDatas = await prisma.post.count();

    const total = await prisma.post.count({
        where: {
            AND: andConditions,
        },
    });

    return {
        pagination: {
            totalDatas,
            totalMatchedDatas: total,
            totalDatasOnCurrentPage: result.length,
            currentPage: page,
            pageSize: limit,
            totalPages: Math.ceil(total / limit),
        },
        data: result,
    };
};

const getPostById = async (id: string) => {
    const result = await prisma.$transaction(async (tx) => {
        const updateViewCount = await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        const post = await tx.post.findUnique({
            where: { id },
            include: {
                comments: {
                    where: {
                        parentId: null,
                        status: CommentStatus.APPROVED
                    },
                    include: {
                        replies: {
                            where: {
                                status: CommentStatus.APPROVED
                            },
                            include: {
                                replies: {
                                    where: {
                                        status: CommentStatus.APPROVED
                                    }
                                }
                            }
                        }
                    }
                },
            },
        });
        return post;
    });

    return result;
};

export const postService = {
    createPost,
    getAllPosts,
    getPostById,
};
