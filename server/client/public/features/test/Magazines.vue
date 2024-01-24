<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import BasicDataForm from '~/components/test/BasicDataForm.vue';

@Component({
  components: {
    BasicDataForm,
  },
})
export default class Magazines extends Vue {
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
    <button @click="toggleForm">{{ showForm ? 'Hide' : 'Show' }} form</button>
    <div>Magazines list here...</div>
  </div>
</template>
