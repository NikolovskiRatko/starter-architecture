import { isObject } from 'lodash';
import type { LaravelValidationErrorResponse } from '@/types';

export const isLaravelValidationErrorResponse = (data: any): data is LaravelValidationErrorResponse => {
  return (
    isObject(data) &&
    'errors' in data &&
    isObject(data.errors) &&
    Object.values(data.errors).every((messages) => {
      return Array.isArray(messages) && messages.every((message) => typeof message === 'string');
    })
  );
};
