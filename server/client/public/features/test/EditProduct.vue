<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import BasicDataForm from '~/components/test/BasicDataForm.vue';

@Component({
  components: {
    BasicDataForm,
  },
})
export default class EditProduct extends Vue {
  public showForm: boolean = false;

  public toggleForm() {
    this.showForm = !this.showForm;
  }
}
</script>

<template>
  <div>
    <div v-if="showForm">
      <BasicDataForm @saved="toggleForm" />
    </div>
    <br><br>
    <button v-on:click="toggleForm">{{ showForm ? 'Hide' : 'Show' }} form</button>
    <div>Products list here...</div>
  </div>
</template>
