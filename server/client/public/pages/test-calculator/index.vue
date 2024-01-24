<script setup>
  import { ref } from 'vue';

  const selectedPlanet = ref('earth');
  const gross_salary = ref(0);
  const calculatedTax = ref(0);
  const netIncome = ref(0);
  const calculated = ref(false);

  const taxRules = [
    {
      name: "earth",
      taxes: [
        {
          name: "Income Tax",
          type: "income_tax",
          rate: 0.20, // 20%
          upper_limit: null,
          lower_limit: 1000,
          taxable_lower_limit: 0,
        },
        {
          name: "Social Contributions",
          type: "social",
          rate: 0.10, // 10%
          upper_limit: 3000,
          lower_limit: 1000,
          taxable_lower_limit: 1000,
        },
        {
          name: "Mars Mission Tax",
          type: "extra",
          rate: 0.10, // 10%
          upper_limit: null,
          lower_limit: 0,
          taxable_lower_limit: 0,
        },
      ],
    },
    {
      name: "mars",
      taxes: [
        {
          name: "Income Tax",
          type: "income_tax",
          rate: 0.10, // 10%
          upper_limit: null,
          lower_limit: 1000,
          taxable_lower_limit: 0,
        },
        {
          name: "Social Contributions",
          type: "social",
          rate: 0.10, // 10%
          upper_limit: 3000,
          lower_limit: 1000,
          taxable_lower_limit: 1000,
        },
      ],
    },
  ];

  const calculate = () => {
    console.log("Calculate function");
    const planet = taxRules.find((p) => p.name === selectedPlanet.value);
    if (planet) {
      console.log("Planet value: ", planet);
      let totalTax = 0;
      planet.taxes.forEach((tax) => {
        if(tax.lower_limit >= gross_salary.value) {
          if(tax.upper_limit !== null && tax.upper_limit <= gross_salary.value) {
            const taxableIncome = Math.max(gross_salary.value - (tax.taxable_lower_limit || 0), 0);
            console.log(taxableIncome);
            const taxAmount = taxableIncome * tax.rate;
            totalTax += taxAmount;
          }
        }
      });
      console.log('Total tax: ', totalTax)

      if (totalTax > 0) {
        calculatedTax.value = (totalTax / 100) * gross_salary.value;
        console.log('calculatedTax: ', calculatedTax)
        netIncome.value = gross_salary.value - calculatedTax.value;
      } else {
        netIncome.value = gross_salary.value;
      }
      calculated.value = true;
      console.log("Total Tax:", totalTax);
    } else {
      console.error("Selected planet not found in tax rules.");
    }
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
        <p>Calculated Tax Income: {{ calculatedTax }}</p>
        <p>Net Income: {{ netIncome }}</p>
        <button @click="clearResult">Clear Result</button>
      </div>
    </div>
  </div>
</template>
