import type { Transformers } from '../../types';

type Parameters<T> = {
    input: string,
    values: Transformers<T>,
    defaultValues: T
};

export const parseTransformQueryString = <T>({
    input,
    values,
    defaultValues
}: Parameters<T>): T => {
    const searchParams = new URLSearchParams(input);

    const parsedTransformedValues: Partial<T> = {};

    for (const key in values) {
        if (!Object.hasOwn(values, key)) continue;

        const allValues = searchParams.getAll(key); // handles arrays and repeated keys
        const value: string | string[] =
            allValues.length > 1 ? allValues : allValues[0] ?? '';

        const transform = values[key];
        const transformedValue = transform(value);

        if (transformedValue !== null) {
            parsedTransformedValues[key] = transformedValue;
        }
    }

    return {
        ...defaultValues,
        ...parsedTransformedValues
    };
};
