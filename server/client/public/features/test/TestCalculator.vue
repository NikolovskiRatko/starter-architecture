<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';

  export default class TestCalculator extends Vue {

    selectedPlanet: string;
    salary: number;
    calculatedTax: number;
    netIncome: number;
    calculated: Boolean;
    taxRules: Array<any>;

    constructor() {
      super();
      // Ideally get these rules from the backend api, or save them in a Javascript object
      this.taxRules = [
        {
          name: "earth",
          taxes: [
            {
              name: "Income Tax",
              type: "income_tax",
              rate: 0.20, // 20%
              upper_limit: null,
              lower_limit: 1000,
              taxable_lower_limit: null,
            },
            {
              name: "Social Contributions",
              type: "social",
              rate: 0.10, // 10%
              upper_limit: 3000,
              lower_limit: null,
              taxable_lower_limit: 1000,

            },
            {
              name: "Mars Mission Tax",
              type: "extra",
              rate: 0.10, // 10%
              upper_limit: null,
              lower_limit: null,
              taxable_lower_limit: null,
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
              taxable_lower_limit: null,
            },
            {
              name: "Social Contributions",
              type: "social",
              rate: 0.10, // 10%
              upper_limit: 3000,
              lower_limit: null,
              taxable_lower_limit: 1000,
            },
          ],
        },
      ];
      this.calculated = false;
      this.netIncome = 0;
      this.calculatedTax = 0;
      this.salary = 0;
      this.selectedPlanet = 'earth';
    }

    calculate() {
      console.log("Calculate function");
      console.log("Tax Rules:", this.taxRules);
      // Find the planet object based on the selected planet
      const planet = this.taxRules.find((p) => p.name === this.selectedPlanet);
      if (planet) {
        console.log("Planet value: ", planet);
        let totalTax = 0;
        // Iterate through the taxes for the selected planet
        planet.taxes.forEach((tax) => {
          if (tax.taxable_lower_limit === null || this.salary >= tax.taxable_lower_limit) {
            // Apply tax rate if taxable_lower_limit is null or salary is above or equal to it
            const taxableIncome = Math.max(this.salary - (tax.lower_limit || 0), 0);
            const taxAmount = taxableIncome * tax.rate;
            totalTax += taxAmount;
          }
        });
        if (totalTax > 0) {
          this.calculatedTax = (totalTax / 100) * this.salary;
          this.netIncome = this.salary - this.calculatedTax;
        } else {
          this.netIncome = this.salary;
        }
        this.calculated = true;
        console.log("Total Tax:", totalTax);
      } else {
        console.error("Selected planet not found in tax rules.");
      }
    }

    clearResult() {
      this.calculated = false;
      this.calculatedTax = 0;
      this.netIncome = 0;
    }
  }
</script>

<template>
  <div>
    <h1>Tax Calculator</h1>
    <div>
      <label>Salary:</label>
      <input v-model="salary" type="number" />
    </div>
    <div>
      <label>Planet:</label>
      <select v-model="selectedPlanet">
        <option value="earth">Earth</option>
        <option value="mars">Mars</option>
      </select>
    </div>
    <div>
      <button @click="calculate">Calculate</button>
    </div>
    <div>
      <h2>Result:</h2>
      <p>Calculated Tax Income: {{ calculatedTax }}</p>
      <p>Net Income: {{ netIncome }}</p>
      <button @click="clearResult">Clear Result</button>
    </div>
  </div>
</template>
