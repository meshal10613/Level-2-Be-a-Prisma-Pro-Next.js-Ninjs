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

export default function CreateBlogFromServer() {
    const createBlog = async (formData: FormData) => {
		"use server";
		console.log(formData.get("title"))
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
                            <Input type="text" name="title" />
                        </Field>
                        <Field>
                            <FieldLabel>Content</FieldLabel>
							<TextArea name="content" />
                        </Field>
                        <Field>
                            <FieldLabel>Tags</FieldLabel>
                            <Input type="text" name="tags" />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button form="blog-form" type="submit" className="w-full cursor-pointer">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}
