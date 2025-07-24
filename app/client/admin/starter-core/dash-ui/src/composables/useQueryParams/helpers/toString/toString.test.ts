import { describe, expect, test } from '@jest/globals';

import { toString } from './toString';

describe('useQueryParams - toString transformer', () => {
    test('string', () => {
        const transformed = toString('foo');
        const equals = 'foo';
        expect(transformed).toEqual(equals);
    });

    test('string numeric', () => {
        const transformed = toString('123');
        const equals = '123';
        expect(transformed).toEqual(equals);
    });

    test('empty string', () => {
        const transformed = toString('');
        const equals = '';
        expect(transformed).toEqual(equals);
    });

    test('invalid - array', () => {
        const transformed = toString([]);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - string array', () => {
        const transformed = toString(['foo']);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - empty object', () => {
        const transformed = toString({});
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - object', () => {
        const transformed = toString({ foo: 'bar' });
        const equals = null;
        expect(transformed).toEqual(equals);
    });
});
