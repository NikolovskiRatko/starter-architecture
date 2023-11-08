<!--<script lang="ts">-->
<!--  import 'reflect-metadata'-->
<!--  import { watch } from "fs";-->

<!--  @Component-->
<!--  export default class FormInputCheckbox extends Vue {-->
<!--    @Prop() value;-->
<!--    @Prop() id;-->
<!--    @Prop() options;-->
<!--    @Prop({ default: true }) isInline;-->
<!--    @Prop({ default: false }) disabled;-->
<!--    @Inject('label_start') private label_start!: string;-->
<!--    @Inject('form') private form!: string;-->

<!--    colOneClass: string = '';-->
<!--    colTwoClass: string = '';-->
<!--    formGroupClass: string = '';-->
<!--    labelClass: string = '';-->

<!--    @Watch('value',{ deep: true })-->
<!--    changeSelected() {-->
<!--      this.selected = this.value;-->
<!--    }-->

<!--    selected: Array<any> = [];-->

<!--    constructor() {-->
<!--      super();-->
<!--      if (typeof this.isInline === 'undefined' || !this.isInline) {-->
<!--        this.colOneClass = 'col-12';-->
<!--        this.colTwoClass = 'col-12';-->
<!--        this.formGroupClass = 'form-group form-radio';-->
<!--        this.labelClass = 'text-2';-->
<!--      } else {-->
<!--        this.colOneClass = 'col-lg-4 col-md-2';-->
<!--        this.colTwoClass = 'col-lg-8 col-md-10';-->
<!--        this.formGroupClass = 'form-group form-radio form-group-inline';-->
<!--        this.labelClass = 'col-form-label text-2';-->
<!--      }-->
<!--    }-->

<!--    mounted()-->
<!--    {-->
<!--      this.changeSelected();-->
<!--    }-->

<!--    isSelected(value){-->
<!--      return this.selected != undefined && this.selected.indexOf(value) != -1;-->
<!--    }-->

<!--    emitValue(value){-->
<!--      if(this.selected != undefined && this.selected.indexOf(value) == -1)-->
<!--        this.selected.push(value);-->
<!--      else-->
<!--        this.selected.splice(this.selected.indexOf(value),1);-->
<!--      this.$emit('input', this.selected)-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<template>-->
<!--  <div :class="formGroupClass">-->
<!--    <div class="form-row">-->
<!--      <div-->
<!--        v-if="label !== undefined"-->
<!--        :class="colOneClass"-->
<!--      >-->
<!--        {{ $t(label_start + '.' + id) }}-->
<!--      </div>-->

<!--      <div :class="colTwoClass">-->
<!--        <div-->
<!--          v-for="option in options"-->
<!--          class="checkbox-wrapper"-->
<!--        >-->
<!--          <label :for="'checkbox-'+id+'-'+option.id">-->
<!--            <input-->
<!--              :id="'checkbox-'+id+'-'+option.id"-->
<!--              :name="id"-->
<!--              type="checkbox"-->
<!--              aria-describedby="PLACEHOLDER"-->
<!--              class="checkbox"-->
<!--              :value="option.id"-->
<!--              :checked="isSelected(option.id)"-->
<!--              :disabled="disabled"-->
<!--              @click="emitValue(option.id)"-->
<!--            >-->
<!--            <span class="checkmark" />-->
<!--            {{ option.name }}-->
<!--          </label>-->
<!--        </div>-->

<!--        <span-->
<!--          v-if="form.errors.has(id)"-->
<!--          class="help is-danger"-->
<!--        >-->
<!--          {{ $t(form.errors.get(id)) }}-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
