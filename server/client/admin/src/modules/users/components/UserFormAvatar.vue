<script lang="ts" setup>
  import { IconEdit, IconSave, IconTrash } from "@starter-core/icons";
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useBEMBuilder } from "@/helpers";
  import "./UserFormAvatar.scss";

  interface UserFormAvatarProps {
    src: string | null;
  }

  type EmitsType = {
    (event: "change", file: File): void;
  };

  const { src } = defineProps<UserFormAvatarProps>();
  const { t: translate } = useI18n();
  const [block, element] = useBEMBuilder("user-form-avatar");
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
    <div class="form-group form-input form-group--inline">
      <div
        class="form-group__column form-group__column--left form-group__column--inline"
      >
        <label class="form-group__label" for="avatar">{{
          translate("users.avatar")
        }}</label>
      </div>
      <div
        class="form-group__column form-group__column--left form-group__column--inline"
      >
        <div :class="element('image-holder').value">
          <img
            v-if="preview || src"
            :src="preview ?? src ?? ''"
            :class="element('image').value"
          />
          <input
            id="avatar"
            :class="element('input').value"
            type="file"
            @change="changeHandler"
          />
          <div :class="element('controls').value">
            <label
              v-if="!preview"
              for="avatar"
              :class="element('control').value"
            >
              <IconEdit />
            </label>
            <button
              v-if="preview"
              :class="element('control', ref({ save: true })).value"
              @click.prevent="saveHandler"
            >
              <IconSave />
            </button>
            <button
              v-if="preview"
              :class="element('control', ref({ delete: true })).value"
              @click.prevent="deleteHandler"
            >
              <IconTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
