export interface FormInputProps {
  name: string;
  error?: string;
  type?: "text" | "password";
  label?: string;
  helperText?: string;
  modelValue?: string;
  isInline?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  readonly?: boolean;
}

export interface FormGroupProps {
  id: string;
  isInline?: boolean;
  className?: string;
}

export interface FormInputRadioProps {
  modelValue: any;
  id: string;
  label: string;
  helperText?: string;
  type?: "default" | "bold" | "solid";
  direction?: "horizontal" | "vertical";
  theme?: "default" | DashUIComponentThemes;
  options: Array<any>;
  isInline?: boolean;
  isDisabled?: boolean;
  error?: string;
}

export interface FormDropdownOption<T = string> {
  id: T;
  name: string;
  isDisabled?: boolean;
}

export interface FormDropdownProps {
  isDisabled?: boolean;
  isInline?: boolean;
  options: FormDropdownOption[];
  id: string;
  modelValue: any;
  label?: string;
  errors?: string[];
}

export interface FormSwitchProps {
  id: string;
  modelValue: any;
  label: string;
  theme?: DashUIComponentThemes;
  isDisabled?: boolean;
  type?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  helperText?: string;
}

export interface FormNumberInputProps extends Omit<FormInputProps, 'type' | 'modelValue'> {
  modelValue?: number;
}
