export type FormSelectOption = string | { label: string; value: string };
export type FormSelectOptions = FormSelectOption[];

export type FormSelectOnSearch = (search: string, loading: (isLoading: boolean) => void) => void;
