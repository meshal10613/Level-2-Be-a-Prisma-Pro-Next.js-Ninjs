import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import Image from "next/image";
import vercel from "../../../public/vercel.svg";

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

    //? Sequential -> takes 4s
    // console.time("Sequential");
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // console.timeEnd("Sequential");

    //? Parallel -> takes 2s
    // console.time("Parallel");
    // const promise1 = new Promise((resolve) => setTimeout(resolve, 2000));
    // const promise2 = new Promise((resolve) => setTimeout(resolve, 2000));
    // await Promise.all([promise1, promise2]);
    // console.timeEnd("Parallel");

    return (
        <div>
            {/* image optimization */}
            {/* local image */}
            <div className="relative w-full h-32 mb-10">
                <Image src={vercel} alt="vercel" fill priority /> {/* priority -> load first */}
            </div>
            {/* link image */}
            <div className="relative w-full h-32 mb-10">
                <Image src={`https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=100`} alt="vercel" fill />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-5 lg:mx-auto gap-5">
                {data?.data?.map((post: BlogPost) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
