"use client";

import { useEffect } from "react";

export default function AboutError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div>
            <h1>Something went wrong: Please try again</h1>
            <button onClick={() => reset()}>Retry</button>
        </div>
    );
}
