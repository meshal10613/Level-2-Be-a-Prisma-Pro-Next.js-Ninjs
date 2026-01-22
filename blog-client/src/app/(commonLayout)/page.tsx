import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
    const { data } = await blogService.getBlogPosts(
        {
            isFeatured: false,
            search: "",
        },
        {
            cache: "no-store",
            // revalidate: 10,
        },
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-5 lg:mx-auto gap-5">
            {data?.data?.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
    );
}
