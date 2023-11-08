<!--<script lang="ts">-->
<!--  import 'reflect-metadata'-->

<!--  @Component-->
<!--  export default class FormBootstrapDropdown extends Vue {-->
<!--    @Prop() value;-->
<!--    @Prop() id;-->
<!--    @Prop() label;-->
<!--    @Prop() options;-->
<!--    @Prop() form;-->

<!--    constructor() {-->
<!--      super();-->
<!--      console.log("Form input constructor.");-->
<!--    }-->

<!--    emitValue(value){-->
<!--      console.log(value);-->
<!--      this.$emit('input', value)-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<template>-->
<!--  <div class="dropdown">-->
<!--    <button-->
<!--      id="dropdownMenuButton"-->
<!--      class="btn btn-secondary dropdown-toggle"-->
<!--      type="button"-->
<!--      data-toggle="dropdown"-->
<!--      aria-haspopup="true"-->
<!--      aria-expanded="false"-->
<!--    >-->
<!--      Dropdown button-->
<!--    </button>-->
<!--    <div-->
<!--      class="dropdown-menu"-->
<!--      aria-labelledby="dropdownMenuButton"-->
<!--    >-->
<!--      <a-->
<!--        v-for="option in options"-->
<!--        class="dropdown-item"-->
<!--        href="#"-->
<!--      >{{ option.name }}</a>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
