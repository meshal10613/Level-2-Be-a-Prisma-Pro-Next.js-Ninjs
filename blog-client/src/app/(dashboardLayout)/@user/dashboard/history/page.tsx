import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service"

export default async function DashboardHistory() {
	const response = await blogService.getBlogPosts();
	const posts = response.data?.data || [];

	return(
		<div className="p-6">
			<h2 className="text-2xl font-semibold">Blog Post History</h2>
			<HistoryTable posts={posts}/>
		</div>
	)
}