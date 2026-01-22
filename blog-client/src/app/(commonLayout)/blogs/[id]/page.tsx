// import { useParams } from "next/navigation";

export default async function BlogDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // const { id } = useParams();
    const { id } = await params;
    return (
        <div>
            <h1>This is {id} Page</h1>
        </div>
    );
}
