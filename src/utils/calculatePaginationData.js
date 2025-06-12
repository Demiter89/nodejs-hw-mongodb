export const calculatePaginationData = ({ page, perPage, totalItems }) => {
    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / perPage);
  
    const currentPage = totalItems === 0 ? 1 : Math.min(page, totalPages);
  
    const hasPreviousPage = currentPage > 1 && totalPages > 0;
    const hasNextPage = currentPage < totalPages;
  
    return {
      page: currentPage,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    };
  };