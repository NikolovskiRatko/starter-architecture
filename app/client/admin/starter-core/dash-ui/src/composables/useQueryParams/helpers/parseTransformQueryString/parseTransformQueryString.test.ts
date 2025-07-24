import { describe, expect, test } from '@jest/globals';

import { TRANSFORMS } from '../../constants';
import { parseTransformQueryString } from './parseTransformQueryString';

describe('useQueryParams - parseTransformQueryString', () => {
    test('default value', () => {
        type SampleType = {
            name: string;
        };

        const params = parseTransformQueryString<SampleType>({
            input: 'name=foo',
            values: {
                name: TRANSFORMS.toString
            },
            defaultValues: {
                name: ''
            }
        });

        expect(params).toEqual({
            name: 'foo'
        });
    });

    test('default value - empty input', () => {
        type SampleType = {
            name: string;
        };

        const params = parseTransformQueryString<SampleType>({
            input: '',
            values: {
                name: TRANSFORMS.toString
            },
            defaultValues: {
                name: 'foo'
            }
        });

        expect(params).toEqual({
            name: 'foo'
        });
    });

    test('default value - empty input, null default', () => {
        type SampleType = {
            name: string | null;
        };

        const params = parseTransformQueryString<SampleType>({
            input: '',
            values: {
                name: TRANSFORMS.toString
            },
            defaultValues: {
                name: null
            }
        });

        expect(params).toEqual({
            name: null
        });
    });

    test('default value - null default, partialy defined', () => {
        type SampleType = {
            name: string | null;
        };

        const params = parseTransformQueryString<SampleType>({
            input: 'name=',
            values: {
                name: TRANSFORMS.toString
            },
            defaultValues: {
                name: null
            }
        });

        expect(params).toEqual({
            name: null
        });
    });

    test('optional field', () => {
        type SampleType = {
            name?: string;
        };

        const params = parseTransformQueryString<SampleType>({
            input: 'name=foo',
            values: {
                name: TRANSFORMS.toString
            },
            defaultValues: {}
        });

        expect(params).toEqual({
            name: 'foo'
        });
    });

    test('optional field - partialy defined', () => {
        type SampleType = {
            name?: string;
        };

        const params = parseTransformQueryString<SampleType>({
            input: 'name=',
            values: {
                name: TRANSFORMS.toString
            },
            defaultValues: {}
        });

        expect(params).toEqual({});
    });

    test('optional field - empty input', () => {
        type SampleType = {
            name?: string;
        };

        const params = parseTransformQueryString<SampleType>({
            input: '',
            values: {
                name: TRANSFORMS.toString
            },
            defaultValues: {}
        });

        expect(params).toEqual({});
    });

    test('sort value', () => {
        type SampleType = {
            sort?: { [field: string]: 'ASC' | 'DESC' };
        };

        const params = parseTransformQueryString<SampleType>({
            input: 'sort[name]=ASC',
            values: {
                sort: TRANSFORMS.toSort
            },
            defaultValues: {}
        });

        expect(params).toEqual({
            sort: {
                name: 'ASC'
            }
        });
    });

    test('sort value - encoded characters', () => {
        type SampleType = {
            sort?: { [field: string]: 'ASC' | 'DESC' };
        };

        const params = parseTransformQueryString<SampleType>({
            input: 'sort%5Bname%5D=ASC',
            values: {
                sort: TRANSFORMS.toSort
            },
            defaultValues: {}
        });

        expect(params).toEqual({
            sort: {
                name: 'ASC'
            }
        });
    });

    test('mixed example', () => {
        type SampleType = {
            page: number;
            limit: number;
            name?: string;
            active?: boolean;
        };

        const params = parseTransformQueryString<SampleType>({
            input: 'active=false',
            values: {
                page: TRANSFORMS.toNumber,
                limit: TRANSFORMS.toNumber,
                name: TRANSFORMS.toString,
                active: TRANSFORMS.toBoolean
            },
            defaultValues: {
                page: 1,
                limit: 25
            }
        });

        expect(params).toEqual({
            page: 1,
            limit: 25,
            active: false
        });
    });
});
