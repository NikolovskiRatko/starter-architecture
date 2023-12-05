import { ref, reactive } from "vue";
import type { Ref } from "vue";
import { Form } from "@/plugins/form-backend-validation-new";
import { mergeWith, cloneDeep } from "lodash";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { get, post } from "@/services/HTTP";
import { InitFormFromItem, OnSubmit } from "./types/useForm";
import { useEventsBus } from "@/composables";

export function useForm(fetchUri, data) {
  const item = ref(cloneDeep(data));
  const message: Ref<String> = ref("");
  const messageClass: Ref<String> = ref("");
  // TODO: Implement a new custom Object for Form, similar to the package but simpler //DONE//
  const form = ref(new Form(item.value));
  const loading: Ref<Boolean> = ref(form.value.processing);
  const confirmUnsavedChangesModal: Ref<Boolean> = ref(false);
  const skipChangeCheckOnSubmit: Ref<Boolean> = ref(false);
  const routeTo: object = ref({});
  const formattedMessage: Ref<Array<any>> = ref([]);
  const response: object = ref(form.value.errors);
  const error: object = reactive({});
  const { emit } = useEventsBus();

  const router = useRouter();

  function displaySuccessMessage(messageInternal: string) {
    messageClass.value = "alert alert-success";
    message.value = messageInternal;
  }

  function displayErrorMessage(messageInternal: string) {
    messageClass.value = "alert alert-danger";
    message.value = messageInternal;
  }

  // function clearMessage(): void {
  //   message.value = "";
  // }

  // // TODO: All functions that receive form , should probably use this.form instead of the parametar they recieve
  // function removeFormErrors(form, field: string) {
  //   form.value.errors.clear(field);
  // }

  // function resetForm(form) {
  //   //   // TODO: Implement the reset value functionality here from the package
  //   form.value.reset();
  // }

  // function clearErrors(event: Event) {
  //   // TODO: Implement clear errors similar to the package
  //   form.value.errors.clear(event.target.name);
  // }

  /**
   *
   * @remarks
   * Called in the mounted lifecycle hook, initializes the form with data returned from the @GET method
   *
   * @param onInit - Pass in a function reference to get executed after fetch
   * @param resetOnSuccess - Might be removed, serves for setting initial values to the form ?
   * @returns nothing
   *
   * @beta
   */
  const initFormFromItem: InitFormFromItem = (
    onInit,
    resetOnSuccess = true,
  ) => {
    loading.value = true;
    get(fetchUri)
      .then((response) => {
        // For this to work correctly you need to correctly define the object type and properties in the Objects file
        // ex. if expected values from server are id and name than they need to be defined in the object in Objects.ts
        item.value = mergeWith({}, item.value, response.data, (a, b) =>
          b === null ? a : undefined,
        );
        onInit?.();
        prepareValidation();
        form.value.populate(item.value);
        // form.value.setInitialValues(item.value, resetOnSuccess);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  /**
   *
   *
   * @remarks
   * Posts the form to the given route
   *
   * @param route - API route string
   * @param redirectRoute - if passed in function, re-routes to the give route
   * @param hasToRedirect - hasToRedirect might be omitted, no need for a redirectRoute string and a bool
   * @returns nothing
   *
   * @beta
   */
  const onSubmitTest: OnSubmit = (route, redirectRoute, hasToRedirect) => {
    loading.value = true;
    // TODO: Change this so that it uses the post method from the HTTP service wrapper and the custom Form object as payload
    post(route, form.value.getData())
      .then((responseInternal) => {
        if (!responseInternal.success) {
          throw responseInternal;
        }
        response.value = responseInternal;
        // if (hasToRedirect) {
        //   skipChangeCheckOnSubmit.value = true;
        //   router.push({ name: redirectRoute, params: { success: '1' } });
        // }
      })
      .catch((errorInternal) => {
        console.log("USEFORM", errorInternal);
        // Object.assign(error, errorInternal.error.errors);
        error.value = errorInternal.error.errors;

        console.log(form.value.errors);
        // form.errors.withErrors(errorInternal.error.errors)

        // console.error('Request failed with:', error);
        // displayErrorMessage(error.message);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  // const onSubmit : OnSubmit = (route, redirectRoute, hasToRedirect) => {
  //   loading.value = true;
  //   // TODO: Change this so that it uses the post method from the HTTP service wrapper and the custom Form object as payload
  //   return form.value.post(route)
  //       .then((responseInternal) => {
  //         response.value = responseInternal;
  //         if (hasToRedirect) {
  //           skipChangeCheckOnSubmit.value = true;
  //           router.push({ name: redirectRoute, params: { success: '1' } });
  //         }
  //         // TODO if there is a need send a message in laravel response and display that instead
  //         displaySuccessMessage('Success');
  //
  //         // TODO: EventBus is deprecated , find alternative
  //         // EventBus.$emit('formSubmitSuccess');
  //       })
  //       .catch((errorInternal) => {
  //         error.value = errorInternal;
  //         console.error('Request failed with:', error);
  //         displayErrorMessage(error.message);
  //       })
  //       .finally(() => {
  //         loading.value = false;
  //       });
  // };

  /**
   * @remarks
   * Called before changing route, checks for unsaved changes to the form, displays modal if so
   *
   * @param to - the new route
   * @param from - old route
   * @param next - function that continues with the re-route
   * @returns nothing
   */
  onBeforeRouteLeave((to, from, next) => {
    if (checkEqual(form) || skipChangeCheckOnSubmit) {
      next();
    } else {
      next(false);
      routeTo.value = to;
      confirmUnsavedChangesModal.value = true;
    }
  });

  /**
   * @remarks
   *  Used for unsavedChangesModal, compares inital form with current form, if same return true and dont show modal
   *
   * @param form - current state of form
   * @returns True/False
   */
  function checkEqual(form) {
    let equal: boolean = true;
    for (const key in form.initial) {
      if (form.hasOwn(key)) {
        equal =
          equal &&
          JSON.stringify(form[key]) == JSON.stringify(form.initial[key]);
        // if (!(JSON.stringify(form[key]) == JSON.stringify(form.initial[key]))) {
        // }
      } else {
        console.warn("Missing prop: " + key);
      }
    }
    return equal;
  }

  /**
   *  @remarks
   *  Used for modal confirmation
   */
  function confirmUnsavedChanges() {
    // TODO: Consider removing this complexity for the time being, it seems to have to do something with modals and different routes for a given form
    form.value.reset();
    router.push(routeTo);
    confirmUnsavedChangesModal.value = false;
  }

  /**
   *  @remarks
   *  Used for closing modal
   */
  function cancelUnsavedChanges() {
    confirmUnsavedChangesModal.value = false;
  }

  function prepareValidation() {
    // TODO: Not sure why this is needed if all validation is done server side
    const { validation_messages: validationMessages } = item;
    if (validationMessages) {
      for (const [key, value] of Object.entries(validationMessages)) {
        const [field, validationType] = key.split(".");
        if (formattedMessage[field] === undefined) {
          formattedMessage[field] = {};
        }
        formattedMessage[field][validationType] = $t(value);
        // Workaround to make the new props reactive and visible in devtools
        formattedMessage.value = Object.assign({}, formattedMessage.value, {});
      }
    }
  }

  return {
    response,
    form,
    messageClass,
    message,
    item,
    loading,
    // onSubmit,
    onSubmitTest,
    initFormFromItem,
    // clearErrors,
  };
}
