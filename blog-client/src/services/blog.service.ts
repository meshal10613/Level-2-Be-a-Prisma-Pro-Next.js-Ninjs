import { env } from "@/env";

const API_URL = env.API_URL;

//? No Dynamic and no { cache: no-store } : SSG -> Static Page
//? { cache: no-store } : SSR -> Dynamic Page
//? next: { revalidate: 10 } : ISR -> Mix between SSR and SSG

export const blogService = {
    getBlogPosts: async () => {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                next: { revalidate: 10 },
            });
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
