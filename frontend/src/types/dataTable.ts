export type TSort = {
  key?: string,
  order?: string,
}

export type TQuery = {
  [key: string]: any;
}

export type TTableDataReq<T> = {
  pageIndex?: number,
  pageSize?: number,
  sort?: TSort | null,
  query?: T | null
}

export type TTableDataRes<T> = {
  rows: T[],
  total: number,
}
