export const taxRules = {
    earth: {
        taxes: [
            {
                name: "Income Tax",
                type: "income_tax",
                rate: 0.20, // 20%
                upper_limit: Number.MAX_VALUE,
                lower_limit: 1000,
                taxable_upper_limit: null,
                taxable_lower_limit: 1000,
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
                taxable_upper_limit: null,
                taxable_lower_limit: 0,
            },
        ],
    },
    mars: {
        taxes: [
            {
                name: "Income Tax",
                type: "income_tax",
                rate: 0.10, // 10%
                upper_limit: Number.MAX_VALUE,
                lower_limit: 1000,
                taxable_upper_limit: null,
                taxable_lower_limit: 1000,
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
};
