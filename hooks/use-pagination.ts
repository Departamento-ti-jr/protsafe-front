// usePagination.ts
import { useState } from "react";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function usePagination<T>(initialPageSize = 20) {
  const [pagination, setPagination] = useState<PaginatedResponse<T>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
    totalPages: 1,
  });

  return { pagination, setPagination };
}
