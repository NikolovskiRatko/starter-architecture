import basic from './basic.json';
import datatable from './datatable.json';
import validation from './validation.json';

export const users = {
  ...datatable,
  ...basic,
  ...validation,
};
