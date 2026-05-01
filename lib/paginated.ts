export const PAGE_SIZE = 10;


export const LIST_FETCH_LIMIT = 500;

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export async function readPaginatedJson<T>(
  r: Response,
): Promise<PaginatedResponse<T>> {
  const j = (await r.json()) as PaginatedResponse<T>;
  if (!Array.isArray(j?.items)) {
    throw new Error("Invalid list response");
  }
  return j;
}

export function slicePage<T>(rows: T[], page: number, pageSize: number): T[] {
  const p = Math.max(1, page);
  const start = (p - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}
