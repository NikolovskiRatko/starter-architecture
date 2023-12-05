<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useEventsBus } from "@/composables";

export default defineComponent({
  name: "FileUpload",
  props: {
    value: {},
    id: {},
    label: {},
    form: {},
    isInline: {},
    disabled: {},
    placeholderImage: {},
    componentType: { default: "full" },
  },
  setup(props) {
    const colOneClass = ref("");
    const colTwoClass = ref("");
    const formGroupClass = ref("");
    const inputClass = ref("form-control");
    const labelClass = ref("");
    const url = ref(null);
    const { emit } = useEventsBus();

    const updateInputClass = () => {
      if (props.form.errors.has(props.id)) {
        inputClass.value = "form-control error";
      } else {
        inputClass.value = "form-control";
      }
    };

    const onFileChange = (file) => {
      // const file = e.target.files[0];
    };

    const emitValue = () => {
      const file = $refs.photo_file.files[0];
      url.value = URL.createObjectURL(file);
      // emit('input', file);
    };

    watch(() => props.form.errors, updateInputClass);

    const setClasses = () => {
      if (!props.isInline || typeof props.isInline === "undefined") {
        colOneClass.value = "col-12";
        colTwoClass.value = "col-12";
        formGroupClass.value = "form-group form-file-upload";
        labelClass.value = "text-2";
      } else {
        colOneClass.value = "col-lg-4 col-md-2";
        colTwoClass.value = "col-lg-8 col-md-10";
        formGroupClass.value = "form-group form-file-upload form-group-inline";
        labelClass.value = "col-form-label text-2";
      }
    };

    setClasses();

    return {
      colOneClass,
      colTwoClass,
      formGroupClass,
      inputClass,
      labelClass,
      url,
      onFileChange,
      emitValue,
    };
  },
});
</script>

<template>
  <div :class="formGroupClass">
    <div class="form-row">
      <div v-if="label !== undefined" :class="colOneClass">
        <label v-if="label" :for="id" :class="labelClass">{{
          $t(label)
        }}</label>
      </div>
      <div :class="colTwoClass">
        <input
          v-show="componentType === 'full' || componentType === 'button'"
          :id="id"
          ref="photo_file"
          type="file"
          :name="id"
          @change="emitValue"
        />
        <div
          v-show="componentType === 'full' || componentType === 'image'"
          class="bg-image-holder"
          :class="{ 'image-only': componentType === 'image' }"
          @click="$refs.photo_file.click()"
        >
          <!-- ... (rest of the template remains unchanged) ... -->
        </div>
      </div>
    </div>
  </div>
</template>
