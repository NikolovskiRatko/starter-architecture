<script lang="ts" setup>
  import { IconEdit, IconSave, IconClose } from "@starter-core/icons";
  import { ref } from "vue";
  import { useBEMBuilder } from "@/helpers";

  import "./UserFormAvatar.scss";

  interface UserFormAvatarProps {
    src: string | null;
    isOutline?: boolean;
    isCircle?: boolean;
  }

  type EmitsType = {
    (event: "change", file: File): void;
  };

  const { src, isOutline, isCircle } = defineProps<UserFormAvatarProps>();
  const [block, element] = useBEMBuilder(
    "user-form-avatar",
    ref({
      outline: isOutline,
      circle: isCircle,
    }),
  );
  const preview = ref<string | null>(null);
  const file = ref<File | null>(null);

  const emit = defineEmits<EmitsType>();

  const createImage = (newFile: File) => {
    var reader = new FileReader();

    reader.onload = (e) => {
      preview.value = e.target.result;
    };

    file.value = newFile;
    reader.readAsDataURL(newFile);
  };

  const changeHandler = (e) => {
    var files = e.target.files;

    if (!files.length) return;
    createImage(files[0]);

    return files;
  };

  const deleteHandler = () => {
    preview.value = null;
    file.value = null;
  };

  const saveHandler = () => {
    if (file.value) {
      emit("change", file.value);
      preview.value = null;
      file.value = null;
    }
  };
</script>
<template>
  <div :class="block">
    <div
      :class="
        element(
          'holder',
          ref({
            circle: isCircle,
            outline: isOutline,
          }),
        ).value
      "
    >
      <img
        alt="Avatar"
        v-if="preview || src"
        :src="preview ?? src ?? ''"
        :class="element('image').value"
      />
    </div>

    <label
      v-if="!preview"
      :class="
        element(
          'upload',
          ref({
            circle: isCircle,
          }),
        ).value
      "
      title=""
      data-original-title="Change avatar"
    >
      <IconEdit />
      <input
        id="avatar"
        :class="element('input').value"
        type="file"
        @change="changeHandler"
      />
    </label>

    <button
      v-if="preview"
      :class="
        element(
          'upload',
          ref({
            circle: isCircle,
          }),
        ).value
      "
      type="button"
      @click.prevent="saveHandler"
    >
      <IconSave />
    </button>

    <button
      v-if="preview"
      @click.prevent="deleteHandler"
      type="button"
      :class="
        element(
          'cancel',
          ref({
            circle: isCircle,
          }),
        ).value
      "
    >
      <IconClose />
    </button>
  </div>
</template>
