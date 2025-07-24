import { describe, expect, test } from '@jest/globals';

import { toStringLiteral } from './toStringLiteral';

describe('useQueryParams - toStringLiteral transformer', () => {
    test('string', () => {
        const transformed = toStringLiteral('foo', 'bar')('foo');
        const equals = 'foo';
        expect(transformed).toEqual(equals);
    });

    test('invalid - string', () => {
        const transformed = toStringLiteral('foo', 'bar')('foo2');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - string numeric', () => {
        const transformed = toStringLiteral('foo', 'bar')('123');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - empty string', () => {
        const transformed = toStringLiteral('foo', 'bar')('');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - array', () => {
        const transformed = toStringLiteral('foo', 'bar')([]);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - string array', () => {
        const transformed = toStringLiteral('foo', 'bar')(['foo']);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - empty object', () => {
        const transformed = toStringLiteral('foo', 'bar')({});
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - object', () => {
        const transformed = toStringLiteral('foo', 'bar')({ foo: 'bar' });
        const equals = null;
        expect(transformed).toEqual(equals);
    });
});
