"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Field, useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { Link } from "lucide-react";
import { FieldDescription, FieldGroup } from "@/components/ui/field";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            console.log(value);
        },
    });

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000",
        });
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="register-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="name"
                            children={() => <Field></Field>}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center w-full gap-3">
                <Button
                    form="register-form"
                    type="submit"
                    className="w-full cursor-pointer"
                >
                    Submit
                </Button>
                <Button
                    onClick={() => handleGoogleLogin()}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                >
                    <FcGoogle /> Sign up with Google
                </Button>
                <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <Link href="/register">Register</Link>
                </FieldDescription>
            </CardFooter>
        </Card>
    );
}
