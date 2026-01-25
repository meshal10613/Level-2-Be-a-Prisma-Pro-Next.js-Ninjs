"use client";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControls {
    meta: {
        currentPage: number;
        pageSize: number;
        totalDatas: number;
        totalDatasOnCurrentPage: number;
        totalMatchedDatas: number;
        totalPages: number;
    };
}

export default function PaginationControls({ meta }: PaginationControls) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const {
        currentPage,
        pageSize,
        totalDatas,
        totalDatasOnCurrentPage,
        totalMatchedDatas,
        totalPages,
    } = meta;
    // const {limit, page, total, totalPages} = meta;

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

	const start = (currentPage * pageSize) - pageSize + 1;
	const end = Math.min(currentPage * pageSize, totalMatchedDatas);

    return (
        <div className="flex items-center justify-between px-2 py-4 border-t mt-4">
            <div className="text-sm text-muted-foreground">
                Showing {start} to {end} of {totalMatchedDatas} results
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant={`outline`}
                    size={`icon`}
                    className="cursor-pointer"
					onClick={() => navigateToPage(1)}
					disabled={currentPage === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant={`outline`}
                    size={`icon`}
                    className="cursor-pointer"
                    onClick={() => {
                        if (currentPage > 1) navigateToPage(currentPage - 1);
                    }}
					disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>

                <Button
                    variant={`outline`}
                    size={`icon`}
                    className="cursor-pointer"
                    onClick={() => navigateToPage(currentPage + 1)}
					disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant={`outline`}
                    size={`icon`}
                    className="cursor-pointer"
					onClick={() => navigateToPage(totalPages)}
					disabled={currentPage === totalPages}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
