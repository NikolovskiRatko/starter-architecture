<script setup>
  import { ref } from 'vue';
  import useTaxCalculator from '@/composables/useTaxCalculator';
  import { taxRules } from '@/composables/data/taxRules';
  const { calculateTax } = useTaxCalculator();

  const selectedPlanet = ref('earth');
  const gross_salary = ref(0);
  const calculatedTax = ref(0);
  const netIncome = ref(0);
  const calculated = ref(false);

  const calculate = () => {
    calculated.value = false;
    const { calculatedTax: calculatedTaxValue, netIncome: netIncomeValue } = calculateTax(selectedPlanet.value, gross_salary.value, taxRules);
    calculatedTax.value = calculatedTaxValue;
    netIncome.value = netIncomeValue;
    calculated.value = true;
  };

  const clearResult = () => {
    calculated.value = false;
    calculatedTax.value = 0;
    netIncome.value = 0;
  };
</script>

<template>
  <div class="jumbotron">
    <div class="jumbotron_background">

    </div>
    <div class="container-fluid jumbotron_wrapper">
      <h1 class="offset-md-2">Tax Calculator</h1>
      <div class="offset-md-2">
        <label>Gross Salary:</label>
        <input v-model="gross_salary" type="number" />
      </div>
      <div class="offset-md-2">
        <label>Planet:</label>
        <select v-model="selectedPlanet">
          <option value="earth">Earth</option>
          <option value="mars">Mars</option>
        </select>
      </div>
      <div class="offset-md-2">
        <button @click="calculate">Calculate</button>
      </div>
      <div class="offset-md-2">
        <h2>Result:</h2>
        <p>Calculated Tax: {{ calculatedTax }}</p>
        <p>Net Income: {{ netIncome }}</p>
        <button @click="clearResult">Clear Result</button>
      </div>
    </div>
  </div>
</template>
