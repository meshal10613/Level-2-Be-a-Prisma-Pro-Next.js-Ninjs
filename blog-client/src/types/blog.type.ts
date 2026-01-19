export interface BlogPost {
    id: string | number;
    title: string;
    content: string;
    thumbnail?: string | null;
    isFeatured: boolean;
    status: string;
    tags?: string[];
    views: number;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        comments: number;
    };
}
