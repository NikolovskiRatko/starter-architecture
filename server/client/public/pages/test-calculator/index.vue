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
          upper_limit: Number.MAX_VALUE,
          lower_limit: 1000,
          taxable_upper_limit: gross_salary.value,
          taxable_lower_limit: 0,
        },
        {
          name: "Social Contributions",
          type: "social",
          rate: 0.10, // 10%
          upper_limit: Number.MAX_VALUE,
          lower_limit: 1000,
          taxable_upper_limit: 3000,
          taxable_lower_limit: 1000,
        },
        {
          name: "Mars Mission Tax",
          type: "extra",
          rate: 0.05, // 5%
          upper_limit: Number.MAX_VALUE,
          lower_limit: 0,
          taxable_upper_limit: gross_salary.value,
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
          upper_limit: Number.MAX_VALUE,
          lower_limit: 1000,
          taxable_upper_limit: gross_salary.value,
          taxable_lower_limit: 0,
        },
        {
          name: "Social Contributions",
          type: "social",
          rate: 0.05, // 5%
          upper_limit: Number.MAX_VALUE,
          lower_limit: 1000,
          taxable_upper_limit: 3000,
          taxable_lower_limit: 1000,
        },
      ],
    },
  ];

  const calculate = () => {
    calculated.value = false;
    calculatedTax.value = 0;
    netIncome.value = 0;
    console.log("Calculate function");
    const planet = taxRules.find((p) => p.name === selectedPlanet.value);
    if (planet) {
      console.log("Planet value: ", planet);
      let totalTax = 0;
      planet.taxes.forEach((tax) => {
        const lowerLimit = tax.lower_limit || 0; // Default to 0 if lower_limit is not defined
        const upperLimit = tax.upper_limit || Number.MAX_VALUE; // Default to maximum value if upper_limit is not defined
        const lowerTaxableLimit = tax.taxable_lower_limit || 0; // Default to 0 if taxable_lower_limit is not defined
        let upperTaxableLimit = tax.taxable_upper_limit || gross_salary.value; // Default to gross_salary.value if taxable_upper_limit is not defined or smaller
        console.log("Tax Name: ", tax.name);
        console.log("Gross Salary Limit: ", gross_salary.value);
        console.log("Total Tax: ", totalTax);
        console.log("Lower Limit: ", lowerLimit);
        console.log("Upper Limit: ", upperLimit);
        console.log("Lower Taxable Limit: ", lowerTaxableLimit);
        console.log("Upper Taxable Limit: ", upperTaxableLimit);
        if (gross_salary.value >= lowerLimit && gross_salary.value <= upperLimit) {
          // Ensure that upperTaxableLimit is not bigger than gross_salary.value
          if (upperTaxableLimit > gross_salary.value) {
            upperTaxableLimit = gross_salary.value;
          }
          const taxableIncome = upperTaxableLimit - lowerTaxableLimit;
          console.log("Taxable Income: ", taxableIncome);
          if (taxableIncome <= upperTaxableLimit) {
            const taxAmount = taxableIncome * tax.rate;
            console.log("Tax Amount: ", taxAmount);
            totalTax += taxAmount;
          }
        }
        console.log("==========================");
      });
      console.log('END Total tax: ', totalTax);

      if (totalTax > 0) {
        calculatedTax.value = totalTax;
        console.log('calculatedTax: ', calculatedTax);
        netIncome.value = gross_salary.value - calculatedTax.value;
      } else {
        netIncome.value = gross_salary.value;
      }
      totalTax = 0;
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
        <p>Calculated Tax: {{ calculatedTax }}</p>
        <p>Net Income: {{ netIncome }}</p>
        <button @click="clearResult">Clear Result</button>
      </div>
    </div>
  </div>
</template>
