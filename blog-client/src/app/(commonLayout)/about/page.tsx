"use client";

import { getBlogs } from "@/actions/blog.action";
import { ErrorState } from "@/types";
import { useEffect, useState } from "react";

// export const dynamic = "force-dynamic";

export default function AboutPage() {
    const [data, setData] = useState();
    const [err, setErr] = useState<ErrorState | null>(null);

    useEffect(() => {
        (async () => {
            const { data, error } = await getBlogs();

            setData(data);
            setErr(error);
        })();
    }, []);


    console.log(data);
    console.log(err);
    //* For simulating load time
    // await new Promise((resolve) => setTimeout(resolve, 4000));

    //* For simulating error
    // throw new Error("Something went wrong");
    return (
        <div>
            <h1>This is About Page</h1>
        </div>
    );
}
