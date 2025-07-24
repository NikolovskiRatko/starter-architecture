export const toString = (value: string | string[]): string | null => {
    if (typeof value === 'string') {
        return value;
    }

    return null;
};
