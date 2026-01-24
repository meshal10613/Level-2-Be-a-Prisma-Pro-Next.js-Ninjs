"use client";

import { createBlogPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

const blogSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must be less than 200 characters"),
    content: z
        .string()
        .min(10, "Title must be at least 10 characters")
        .max(5000, "Title must be less than 5000 characters"),
    tags: z.string(),
});

export default function CreateBlogFromClient() {
    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: "",
        },
        validators: {
            onSubmit: blogSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Blog....");

            const blogData = {
                title: value.title,
				content: value.content,
                tags: value.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter((item) => item !== ""),
            };

            try {
                const res = await createBlogPost(blogData);
                if (res.error) {
                    toast.error(res.error.message, { id: toastId });
                    return;
                }
                toast.success("Blog created successfully", { id: toastId });
            } catch (error) {
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>You can write your blog here</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="blog-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Title
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Blog Title"
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="content"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Content
                                        </FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Blog Content"
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="tags"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Tags (comma separeted)
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="nestjs, nextjs, typescript"
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        {/* <Field>
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
                        </Field> */}
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
