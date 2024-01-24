export interface ProductFormItem {
    id?: number;
    name?: String;
    description?: String;
    expiration_time?: Date|null;
}

export interface MagazineFormItem {
    id?: number;
    title?: String;
    content?: String;
    expiration_time?: Date|null;
}