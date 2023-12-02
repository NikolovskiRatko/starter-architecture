import { ref } from "vue";
import type { Ref } from "vue";
import { Form } from "@/plugins/form-backend-validation";
import { mergeWith, cloneDeep } from "lodash";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { get } from "@/services/HTTP";
import { InitFormFromItem, OnSubmit } from "./types/useForm";

export function useForm(fetchUri, data) {
  const item = ref(cloneDeep(data));
  const message: Ref<String> = ref("");
  const messageClass: Ref<String> = ref("");
  // TODO: Implement a new custom Object for Form, similar to the package but simpler
  const form = ref(new Form(item.value));
  const loading: Ref<Boolean> = ref(false);
  const confirmUnsavedChangesModal: Ref<Boolean> = ref(false);
  const skipChangeCheckOnSubmit: Ref<Boolean> = ref(false);
  const routeTo: object = ref({});
  const formattedMessage: Ref<Array<any>> = ref([]);
  const response: object = ref({});
  const error: object = ref({});

  const router = useRouter();

  function displaySuccessMessage(messageInternal: string) {
    messageClass.value = "alert alert-success";
    message.value = messageInternal;
  }

  function displayErrorMessage(messageInternal: string) {
    messageClass.value = "alert alert-danger";
    message.value = messageInternal;
  }

  function clearMessage(): void {
    message.value = "";
  }

  // TODO: All functions that receive form , should probably use this.form instead of the parametar they recieve
  function removeFormErrors(form, field: string) {
    // TODO: Implement the clear errors functionality here from the package
    form.value.errors.clear(field);
  }

  function resetForm(form) {
    // TODO: Implement the reset value functionality here from the package
    form.value.reset();
  }

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

  const onSubmit: OnSubmit = (route, redirectRoute, hasToRedirect) => {
    loading.value = true;
    // TODO: Change this so that it uses the post method from the HTTP service wrapper and the custom Form object as payload
    return form.value
      .post(route)
      .then((responseInternal) => {
        response.value = responseInternal;
        if (hasToRedirect) {
          skipChangeCheckOnSubmit.value = true;
          router.push({ name: redirectRoute, params: { success: "1" } });
        }
        // TODO if there is a need send a message in laravel response and display that instead
        displaySuccessMessage("Success");

        // TODO: EventBus is deprecated , find alternative
        // EventBus.$emit('formSubmitSuccess');
      })
      .catch((errorInternal) => {
        error.value = errorInternal;
        console.error("Request failed with:", error);
        displayErrorMessage(error.message);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  // TODO: Understand the need for this and consider removing it if redundant
  function checkEqual(form) {
    let equal: boolean = true;
    for (const key in form.initial) {
      if (form.hasOwnProperty(key)) {
        equal =
          equal &&
          JSON.stringify(form[key]) == JSON.stringify(form.initial[key]);
        if (!(JSON.stringify(form[key]) == JSON.stringify(form.initial[key]))) {
        }
      } else {
        console.warn("Missing prop: " + key);
      }
    }
    return equal;
  }

  onBeforeRouteLeave((to, from, next) => {
    if (checkEqual(form) || skipChangeCheckOnSubmit) {
      next();
    } else {
      next(false);
      routeTo.value = to;
      confirmUnsavedChangesModal.value = true;
    }
  });

  function clearErrors(event: Event) {
    // TODO: Implement clear errors similar to the package
    form.value.errors.clear(event.target.name);
  }

  function confirmUnsavedChanges() {
    // TODO: Consider removing this complexity for the time being, it seems to have to do something with modals and different routes for a given form
    form.reset();
    router.push(routeTo);
    confirmUnsavedChangesModal.value = false;
  }

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
    onSubmit,
    initFormFromItem,
    clearErrors,
  };
}
