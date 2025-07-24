import { describe, expect, test } from '@jest/globals';

import { toBoolean } from './toBoolean';

describe('useQueryParams - toBoolean transformer', () => {
    test('boolean', () => {
        const transformed = toBoolean('true');
        const equals = true;
        expect(transformed).toEqual(equals);
    });

    test('boolean - false', () => {
        const transformed = toBoolean('false');
        const equals = false;
        expect(transformed).toEqual(equals);
    });

    test('invalid - string', () => {
        const transformed = toBoolean('123.1');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - numeric truthy', () => {
        const transformed = toBoolean('1');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - numeric falsy', () => {
        const transformed = toBoolean('0');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - numeric', () => {
        const transformed = toBoolean('123');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - characters string', () => {
        const transformed = toBoolean('foo');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - empty string', () => {
        const transformed = toBoolean('');
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - array', () => {
        const transformed = toBoolean([]);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - string array', () => {
        const transformed = toBoolean(['foo']);
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - empty object', () => {
        const transformed = toBoolean({});
        const equals = null;
        expect(transformed).toEqual(equals);
    });

    test('invalid - object', () => {
        const transformed = toBoolean({ foo: 'bar' });
        const equals = null;
        expect(transformed).toEqual(equals);
    });
});
