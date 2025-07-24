export const toNumber = (value: string | string[]): number | null => {
    if (typeof value === 'string' && !!value) {
        const parsed = Number(value);

        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    return null;
};
