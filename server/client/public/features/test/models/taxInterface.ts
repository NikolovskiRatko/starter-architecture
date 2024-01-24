export interface TaxRates {
  incomeTaxRate: number;
  socialContributionsRate: number;
  marsMissionTaxRate?: number;
}

export interface TaxableLimits {
  lowerLimit: number;
  upperLimit: number;
}

export interface TaxCalculationResult {
  taxableIncome: number;
  incomeTax: number;
  socialContributions: number;
  marsMissionTax?: number;
  totalTax: number;
}
