export type Transformers<T> = {
    [Property in keyof T]: (value: string | string[]) => T[Property] | null;
};
