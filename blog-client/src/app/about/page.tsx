export const dynamic = "force-dynamic";

export default async function AboutPage() {
    //* For simulating load time
    await new Promise((resolve) => setTimeout(resolve, 4000));

    //* For simulating error
    // throw new Error("Something went wrong");
    return (
        <div>
            <h1>This is About Page</h1>
        </div>
    );
}
