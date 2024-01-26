import {Column} from "../types/Column";

export const magazineColumns: Array<Column> = [
    { name: 'Id', column: 'id', width: 'col-1' },
    { name: 'Title', column: 'title', width: 'col-2' },
    { name: 'Content', column: 'content', width: 'col-2' },
    { name: 'Updated At', column: 'updated_at', width: 'col-2' },
    { name: 'Type', column: 'type', width: 'col-2' },
    { name: 'Edit', column: 'link', width: 'col-2' },
];
