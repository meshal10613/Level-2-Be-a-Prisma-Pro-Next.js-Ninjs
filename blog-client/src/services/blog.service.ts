import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

//? No Dynamic and no { cache: no-store } : SSG -> Static Page
//? { cache: no-store } : SSR -> Dynamic Page
//? next: { revalidate: 10 } : ISR -> Mix between SSR and SSG

interface GetBlogParams {
    isFeatured?: boolean;
    search?: string;
}

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export interface BlogData {
    title: string;
    content: string;
    tags?: string[];
}

export const blogService = {
    getBlogPosts: async (params?: GetBlogParams, options?: ServiceOptions) => {
        try {
            const url = new URL(`${API_URL}/posts`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.set(key, value);
                    }
                });
            }

            const config: RequestInit = {};
            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            config.next = {
                ...config.next,
                tags: ["blogPosts"],
            };

            const res = await fetch(url.toString(), config);
            const data = await res.json();

            if (!res.ok || !data.success) {
                return {
                    data: null,
                    error: { message: "Failed to fetch blog posts" },
                };
            }

            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    getBlogById: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/posts/${id}`);
            const data = await res.json();

            if (!res.ok || !data.success) {
                return {
                    data: null,
                    error: { message: "Failed to fetch blog posts" },
                };
            }

            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    createBlogPost: async (blogData: BlogData) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(blogData),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                return {
                    data: null,
                    error: { message: "Failed to create blog post", error: data.error },
                };
            }

            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
};
