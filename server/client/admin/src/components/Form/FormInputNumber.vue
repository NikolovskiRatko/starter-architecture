<!--<script lang="ts">-->
<!--  import 'reflect-metadata'-->

<!--  @Component-->
<!--  export default class FormInputNumber extends Vue {-->
<!--    @Prop() value;-->
<!--    @Prop() id;-->
<!--    @Prop() min;-->
<!--    @Prop() max;-->
<!--    @Prop() label;-->
<!--    @Prop() form;-->
<!--    @Prop() isInline;-->
<!--    @Prop() disabled;-->
<!--    @Prop({-->
<!--      default: true-->
<!--    }) hasLabel;-->

<!--    colOneClass: string = '';-->
<!--    colTwoClass: string = '';-->
<!--    formGroupClass: string = '';-->
<!--    inputClass: string = 'form-control';-->

<!--    constructor() {-->
<!--      super();-->

<!--      if (!this.isInline || typeof this.isInline === 'undefined') {-->
<!--        this.colOneClass = 'col-12';-->
<!--        this.colTwoClass = 'col-12';-->
<!--        this.formGroupClass = 'form-group';-->
<!--      } else {-->
<!--        this.colOneClass = 'col-lg-4 col-md-2';-->
<!--        this.colTwoClass = 'col-lg-8 col-md-10';-->
<!--        this.formGroupClass = 'form-group form-group-inline';-->
<!--      }-->
<!--    }-->

<!--    updated() {-->
<!--      if (this.form.errors.has(this.id)) {-->
<!--        this.inputClass = 'form-control error';-->
<!--      } else {-->
<!--        this.inputClass = 'form-control';-->
<!--      }-->
<!--    }-->

<!--    emitValue(value){-->
<!--      this.$emit('input', value)-->
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
<!--        <label :for="id">-->
<!--          {{ $t(label) }}-->
<!--        </label>-->
<!--      </div>-->
<!--      <div :class="colTwoClass">-->
<!--        &lt;!&ndash; Check Aria described by &ndash;&gt;-->
<!--        <input-->
<!--          :id="id"-->
<!--          type="number"-->
<!--          :min="min"-->
<!--          :max="max"-->
<!--          aria-describedby="PLACEHOLDER"-->
<!--          :value="value"-->
<!--          :name="id"-->
<!--          :class="inputClass"-->
<!--          :disabled="disabled"-->
<!--          @input="emitValue($event.target.value)"-->
<!--        >-->
<!--        <div-->
<!--          v-if="typeof form != 'undefined' && form.errors.has(id)"-->
<!--          class="invalid-feedback"-->
<!--        >-->
<!--          <span v-for="error in form.errors.errors[id]">{{ $t(error) }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
