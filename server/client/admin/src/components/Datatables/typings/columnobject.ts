export type ColumnName = string;
export interface ColumnObject {
  id?: number;
  label?: string;
  name?: ColumnName;
  sortable?: boolean;
}

export type DatatableColumns = ColumnObject[];
