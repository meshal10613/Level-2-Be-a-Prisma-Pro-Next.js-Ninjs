import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = env.API_URL

export default function CreateBlogFromServer() {
    const createBlog = async (formData: FormData) => {
        "use server";

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tags = formData.get("tags") as string;

        const blogData = {
            title,
            content,
            tags: tags
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== ""),
        };
        
        const cookieStore = await cookies();
        
        const res = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(blogData),
        });

        if(res.status === 201 && res.ok) {
            // revalidateTag("blogPosts", "max");
            updateTag("blogPosts");
            redirect("/dashboard/create-blog?success");
        }
    };

    return (
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>You can write your blog here</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="blog-form" action={createBlog}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Blog Title"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Content</FieldLabel>
                            <Textarea
                                name="content"
                                placeholder="Write Your Blog"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Tags (comma separeted)</FieldLabel>
                            <Input
                                type="text"
                                name="tags"
                                placeholder="nestjs, nextjs, typescript"
                            />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    form="blog-form"
                    type="submit"
                    className="w-full cursor-pointer"
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}
