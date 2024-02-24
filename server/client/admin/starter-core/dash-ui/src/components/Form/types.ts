export interface FormInputProps {
  id: string;
  type?: "text" | "password";
  label?: string;
  helperText?: string;
  modelValue?: string;
  isInline?: boolean;
  disabled?: boolean;
  hasError?: boolean;
}

export interface FormGroupProps {
  isInline?: boolean;
  className?: string;
}

export interface FormInputRadioProps {
  modelValue: any;
  id: string;
  label?: string;
  helperText?: string;
  type?: "default" | "bold" | "solid";
  direction?: "horizontal" | "vertical";
  theme?: "default" | DashUIComponentThemes;
  options: Array<any>;
  isInline?: boolean;
  isDisabled?: boolean;
  error?: string;
}