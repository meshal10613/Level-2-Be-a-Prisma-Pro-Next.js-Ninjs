type PaginationAndSorting = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: string;
};

type PaginationAndSortingResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};

const paginationAndSorting = (
    options: PaginationAndSorting
): PaginationAndSortingResult => {
    //? pagination
    const page: number = Number(options.page ?? 1);
    const limit: number = Number(options.limit ?? 5);
    const skip = (page - 1) * limit;

    //? sorting
    const sortBy = options.sortBy ?? "createdAt";
    const sortOrder = options.sortOrder ?? "desc";

    return { page, limit, skip, sortBy, sortOrder };
};

export default paginationAndSorting;
