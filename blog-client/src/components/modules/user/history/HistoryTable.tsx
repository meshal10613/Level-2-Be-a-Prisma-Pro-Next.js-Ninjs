import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";

export default function HistoryTable({ posts }: { posts: BlogPost[] }) {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Featured</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.tags}</TableCell>
                            <TableCell>{item.views}</TableCell>
                            <TableCell>{item.isFeatured ? "True" : "False"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
