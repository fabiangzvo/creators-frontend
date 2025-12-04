export interface Filters {
  page: number;
  limit: number;
  search: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
}
