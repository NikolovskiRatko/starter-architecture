export type ColumnName = string;
export interface ColumnObject {
  id?: number;
  width?: string;
  label?: string;
  name?: ColumnName;
  sortable?: boolean;
}
