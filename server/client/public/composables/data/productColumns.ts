import {Column} from "../types/Column";

export const productColumns: Array<Column> = [
    { name: 'Id', column: 'id', width: 'col-1' },
    { name: 'Name', column: 'name', width: 'col-2' },
    { name: 'Description', column: 'description', width: 'col-2' },
    { name: 'Updated At', column: 'updated_at', width: 'col-2' },
    { name: 'Type', column: 'type', width: 'col-2' },
    { name: 'Edit', column: 'link', width: 'col-2' },
];
