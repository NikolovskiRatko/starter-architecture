<script setup>
  import { ref, defineProps } from 'vue';

  const { records, type, mainRow } = defineProps(['records', 'type', 'mainRow']);
</script>

<template>
  <ul class="responsive-table">
    <li class="table-header">
      <div v-for="(data, index) in mainRow" :key="index" :class="['col', data.width ]">{{ data.name }}</div>
    </li>
    <li v-for="(record, index) in records" :key="index" class="table-row">
      <div class="col col-1">{{ record[mainRow[0].column] }}</div>
      <div class="col col-2">{{ record[mainRow[1].column] }}</div>
      <div class="col col-2">{{ record[mainRow[2].column] }}</div>
      <div class="col col-2">{{ record[mainRow[3].column] }}</div>
      <div class="col col-2">{{ type }}</div>

<!--      <div class="col col-2" v-if="type === 'Product'">-->
<!--        <router-link style="color: black;"-->
<!--                     :to="{-->
<!--            name: 'products-id',-->
<!--            params: { id: record.id }-->
<!--          }">Edit {{ type }}</router-link>-->
<!--      </div>-->

<!--      <div class="col col-2" v-else>-->
<!--        <router-link style="color: black;"-->
<!--                     :to="{-->
<!--            name: 'magazines-id',-->
<!--            params: { id: record.id }-->
<!--          }">Edit {{ type }}</router-link>-->
<!--      </div>-->
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .responsive-table {
    li {
      border-radius: 3px;
      padding: 25px 30px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
    }
    .table-header {
      background-color: #95A5A6;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .table-row {
      background-color: #ffffff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    }
    .col-1 {
      flex-basis: 10%;
    }
    .col-2 {
      flex-basis: 40%;
    }
    .col-3 {
      flex-basis: 25%;
    }
    .col-4 {
      flex-basis: 25%;
    }

    @media all and (max-width: 767px) {
      .table-header {
        display: none;
      }
      .table-row {
      }
      li {
        display: block;
      }
      .col {
        flex-basis: 100%;
      }
      .col {
        display: flex;
        padding: 10px 0;
        &:before {
          color: #6C7A89;
          padding-right: 10px;
          content: attr(data-label);
          flex-basis: 50%;
          text-align: right;
        }
      }
    }
  }
</style>
