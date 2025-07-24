type UnknownQsValue = string | string[];

export const toStringLiteral = <T extends string>(...options: T[]) => (value: UnknownQsValue): T | null => {
    if (typeof value === 'string') {
        if (options.includes(value as T)) {
            return value as T;
        }
    }

    return null;
};
