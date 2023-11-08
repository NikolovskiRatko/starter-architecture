<!--<script lang="ts">-->
<!--  import DatatableHeader from "@/components/Datatables/DatatableHeader.vue";-->
<!--  import TableHead from '@/components/Datatables/_partials/TableHead.vue'-->
<!--  import TableLoader from '@/components/Datatables/_partials/TableLoader.vue';-->
<!--  import { Container } from "vue-smooth-dnd";-->

<!--  @Component({-->
<!--    components: {-->
<!--      DatatableHeader,-->
<!--      TableHead,-->
<!--      TableLoader,-->
<!--      Container-->
<!--    }-->
<!--  })-->

<!--  export default class DragableDatatable extends Vue{-->
<!--    @Prop() columns;-->
<!--    @Prop() loading;-->
<!--    @Prop() datatableData;-->
<!--    @Prop() tableData;-->
<!--    @Prop({ default:true }) addNewEnable !: boolean;-->

<!--    langKey: string = 'combinations';-->

<!--    @Emit('drop')-->
<!--    onDrop() {} void;-->

<!--    constructor(){-->
<!--      super();-->
<!--    }-->

<!--  }-->
<!--</script>-->

<!--<template>-->
<!--  <div class="kt-portlet kt-portlet&#45;&#45;mobile">-->
<!--    <datatable-header-->
<!--      :lang-key="langKey"-->
<!--      :draggable-add-new-enable="addNewEnable"-->
<!--      @add-new="$emit('add-new')"-->
<!--    />-->

<!--    <div class="kt-portlet__body kt-portlet__body&#45;&#45;fit">-->
<!--      <div-->
<!--        class="kt-datatable kt-datatable&#45;&#45;brand kt-datatable&#45;&#45;loaded"-->
<!--        :class="({-->
<!--          'kt-datatable&#45;&#45;loading':loading,-->
<!--        })"-->
<!--      >-->
<!--        <table-->
<!--          id="html_table"-->
<!--          class="kt-datatable__table"-->
<!--          width="100%"-->
<!--        >-->
<!--          <table-head-->
<!--            :columns="columns"-->
<!--            :table-data="tableData"-->
<!--          />-->

<!--          <Container-->
<!--            :tag="{value:'tbody',props:{class:'kt-datatable__body'}}"-->
<!--            lock-axis="y"-->
<!--            drag-handle-selector=".column-drag-handle"-->
<!--            @drop="onDrop"-->
<!--          >-->
<!--            <tr-->
<!--              v-if="tableData.noRecords"-->
<!--              class="kt-datatable__row"-->
<!--            >-->
<!--              <td class="kt-datatable__cell">-->
<!--                <span class="datatable-error">No records found</span>-->
<!--              </td>-->
<!--            </tr>-->

<!--            <tr-->
<!--              v-if="tableData.error"-->
<!--              class="kt-datatable__row"-->
<!--            >-->
<!--              <td class="kt-datatable__cell">-->
<!--                <span-->
<!--                  v-if="tableData.errorMessage !== ''"-->
<!--                  class="datatable-error"-->
<!--                >{{ tableData.errorMessage }}</span>-->
<!--                <span-->
<!--                  v-else-->
<!--                  class="datatable-error"-->
<!--                >{{ $t('errors.generic_error') }}</span>-->
<!--              </td>-->
<!--            </tr>-->

<!--            <slot />-->
<!--          </Container>-->
<!--        </table>-->

<!--        <table-loader :loading="loading" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
