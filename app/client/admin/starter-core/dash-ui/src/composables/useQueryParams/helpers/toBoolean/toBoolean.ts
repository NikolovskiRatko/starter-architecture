export const toBoolean = (value: string | string[]): boolean | null => {
    if (typeof value === 'string' && ['true', 'false'].includes(value)) {
        return value === 'true';
    }

    return null;
};
