<!--<script lang="ts">-->
<!--  import 'reflect-metadata'-->

<!--  @Component-->
<!--  export default class FormulateFileUpload extends Vue {-->
<!--    @Prop() value;-->
<!--    @Prop() form;-->
<!--    @Prop() name;-->
<!--    @Watch('file_object.fileList', { deep: true })-->
<!--    handleChange(){-->
<!--      this.emitInput();-->
<!--    }-->

<!--    uploaded_file: any;-->
<!--    file_object: any = { fileList:{} };-->

<!--    constructor() {-->
<!--      super();-->
<!--      this.uploaded_file = this.value;-->
<!--    }-->

<!--    emitInput(){-->
<!--      this.$emit('input',this.file_object.fileList)-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<template>-->
<!--  <FormulateInput-->
<!--    v-model="file_object"-->
<!--    type="file"-->
<!--    :name="name"-->
<!--    upload-behavior="delayed"-->
<!--    multiple-->
<!--    :errors="form.errors.has('uploaded_file')?form.errors.get('uploaded_file'):''"-->
<!--  />-->
<!--</template>-->
