import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";

export default async function DashboardHistory({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) {
    const { page } = await searchParams;
    const response = await blogService.getBlogPosts({ page });
    const posts = response.data?.data || [];
    const pagination = response.data.pagination || {
        currentPage: 1,
        pageSize: 10,
        totalDatas: 1,
        totalDatasOnCurrentPage: 10,
        totalMatchedDatas: 1,
        totalPages: 1,
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-5">Blog Post History</h2>
            <HistoryTable posts={posts} />
            <PaginationControls meta={pagination} />
        </div>
    );
}
