import {
  guardAgainstReservedFieldName,
  isArray,
  merge,
} from "@/plugins/form-backend-validation/util/index.js";
import Errors from "../form-backend-validation/Errors.js";

class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */

  /** seems to me like the options are not needed, the only time they are used are with the
     resetOnSuccess option which clears the form on a successful submit which doesn't make sense */
  constructor(data = {}) {
    this.processing = false;
    this.successful = false;

    this.withData(data)
      //     .withOptions(options)
      .withErrors({});
  }

  withData(data) {
    //transforms the data/item sent to the form ( ex. UserItem ) into an Object if it's an array
    if (isArray(data)) {
      data = data.reduce((carry, element) => {
        carry[element] = "";
        return carry;
      }, {});
    }

    this.setInitialValues(data);

    this.errors = new Errors();
    this.processing = false;
    this.successful = false;

    // checks if fields names in the Item are reserved ones for the form itself
    for (const field in data) {
      guardAgainstReservedFieldName(field);
      this[field] = data[field];
    }

    return this;
  }

  /**
   * Fetch all relevant data from the form, used for the HTTP service wrapper to set the data being sent in the body
   */
  getData() {
    const data = {};

    for (const property in this.initial) {
      data[property] = this[property];
    }

    return data;
  }

  setInitialValues(values) {
    this.initial = {};

    merge(this.initial, values);
  }

  withErrors(errors) {
    this.errors = new Errors(errors);

    return this;
  }

  /**
   * Clear the form fields.
   */
  clear() {
    for (const field in this.initial) {
      this[field] = "";
    }

    this.errors.clear();
  }

  /**
   * Reset the form fields, set them to the previous(initial) state
   */
  reset() {
    merge(this, this.initial);

    this.errors.clear();
  }

  /**
   * Fill in the form with the fetched data
   */
  populate(data) {
    Object.keys(data).forEach((field) => {
      guardAgainstReservedFieldName(field);

      if (Object.prototype.hasOwnProperty.call(this, field)) {
        merge(this, { [field]: data[field] });
      }
    });

    return this;
  }

  /**
   * Get the error message(s) for the given field.
   *
   * @param field
   */
  // hasError(field) {
  //     return this.errors.has(field);
  // }

  /**
   * Get the first error message for the given field.
   *
   * @param {string} field
   * @return {string}
   */
  getError(field) {
    return this.errors.first(field);
  }

  /**
   * Get the error messages for the given field.
   *
   * @param {string} field
   * @return {array}
   */
  getErrors(field) {
    return this.errors.get(field);
  }
}

export default Form;
