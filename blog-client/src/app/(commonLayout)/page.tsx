import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";

export default async function Home() {
    const { data } = await blogService.getBlogPosts();
    console.log(data);

    return (
        <div>
            <Button variant={`outline`}>Click Here</Button>
        </div>
    );
}
