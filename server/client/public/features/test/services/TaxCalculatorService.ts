import { TaxRates, TaxableLimits, TaxCalculationResult } from '../models/taxInterface';

export default class TaxCalculatorService {
  static calculateEarthTaxes(salary: number, taxRates: TaxRates, taxableLimits: TaxableLimits): TaxCalculationResult {
    let taxableIncome = salary;
    if (taxableIncome < taxableLimits.lowerLimit) {
      taxableIncome = 0;
    } else if (taxableIncome > taxableLimits.upperLimit) {
      taxableIncome = taxableLimits.upperLimit;
    }

    const incomeTax = taxableIncome * taxRates.incomeTaxRate;
    const socialContributions = taxableIncome * taxRates.socialContributionsRate;
    const marsMissionTax = taxableIncome * (taxRates.marsMissionTaxRate || 0);

    const totalTax = incomeTax + socialContributions + marsMissionTax;

    return {
      taxableIncome,
      incomeTax,
      socialContributions,
      marsMissionTax,
      totalTax,
    };
  }

  static calculateMarsTaxes(salary: number, taxRates: TaxRates, taxableLimits: TaxableLimits): TaxCalculationResult {
    let taxableIncome = salary;
    if (taxableIncome < taxableLimits.lowerLimit) {
      taxableIncome = 0;
    } else if (taxableIncome > taxableLimits.upperLimit) {
      taxableIncome = taxableLimits.upperLimit;
    }

    const incomeTax = taxableIncome * taxRates.incomeTaxRate;
    const socialContributions = taxableIncome * taxRates.socialContributionsRate;
    const marsMissionTax = taxableIncome * (taxRates.marsMissionTaxRate || 0);

    const totalTax = incomeTax + socialContributions + marsMissionTax;

    return {
      taxableIncome,
      incomeTax,
      socialContributions,
      marsMissionTax,
      totalTax,
    };
  }
}
