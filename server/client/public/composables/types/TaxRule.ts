export interface TaxRule {
    name: string;
    taxes: Tax[];
}

export interface Tax {
    name: string;
    type: string;
    rate: number;
    upper_limit?: number | null;
    lower_limit?: number | null;
    taxable_upper_limit?: number | null;
    taxable_lower_limit?: number | null;
}