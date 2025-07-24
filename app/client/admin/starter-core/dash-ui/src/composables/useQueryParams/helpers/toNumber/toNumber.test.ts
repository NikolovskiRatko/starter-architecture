import { describe, expect, test } from '@jest/globals';

import { toNumber } from './toNumber';

describe('useQueryParams - toInteger transformer', () => {
    test('integer', () => {
        const transformed = toNumber('123');
        const equals = 123;
        expect(transformed).toEqual(equals);
    });

    test('decimal', () => {
        const transformed = toNumber('123.1');
        const equals = 123.1;
        expect(transformed).toEqual(equals);
    });

    test('invalid - empty string', () => {
        const transformed = toNumber('');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - string', () => {
        const transformed = toNumber('foo');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - array', () => {
        const transformed = toNumber([]);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - string array', () => {
        const transformed = toNumber(['foo']);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - empty object', () => {
        const transformed = toNumber({});
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - object', () => {
        const transformed = toNumber({ foo: 'bar' });
        const equals = null;
        expect(transformed).toEqual(equals);
    });
});
