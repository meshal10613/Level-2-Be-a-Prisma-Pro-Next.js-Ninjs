import { env } from "@/env";

const API_URL = env.API_URL;

export const blogService = {
    getBlogPosts: async () => {
        try {
            const res = await fetch(`${API_URL}/posts`);
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
};
