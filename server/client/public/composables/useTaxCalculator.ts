import { ref } from 'vue';
import { TaxRule, Tax } from './types/TaxRule';

function calculateTax(selectedPlanet: string, grossSalary: number, taxRules: TaxRule[]): { calculatedTax: number; netIncome: number } {
  const calculatedTax = ref(0);
  const netIncome = ref(0);

  const planet = taxRules[selectedPlanet];

  if (planet) {
    let totalTax = 0;

    planet.taxes.forEach((tax) => {
      const lowerLimit = tax.lower_limit || 0;
      const upperLimit = tax.upper_limit || Number.MAX_VALUE;
      const lowerTaxableLimit = tax.taxable_lower_limit || 0;
      let upperTaxableLimit = tax.taxable_upper_limit || grossSalary;

      if (upperTaxableLimit > grossSalary) {
        upperTaxableLimit = grossSalary;
      }

      if (grossSalary >= lowerLimit && grossSalary <= upperLimit) {
        const taxableIncome = upperTaxableLimit - lowerTaxableLimit;

        if (taxableIncome <= upperTaxableLimit) {
          const taxAmount = taxableIncome * tax.rate;
          totalTax += taxAmount;
        }
      }
    });

    if (totalTax > 0) {
      calculatedTax.value = totalTax;
      netIncome.value = grossSalary - calculatedTax.value;
    } else {
      netIncome.value = grossSalary;
    }
  } else {
    console.error('Selected planet not found in tax rules.');
  }

  return { calculatedTax: calculatedTax.value, netIncome: netIncome.value };
}

export default function useTaxCalculator() {
  return {
    calculateTax,
  };
}
