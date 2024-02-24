export interface FormDropdownProps {
  isDisabled?: boolean;
  isInline?: boolean;
  options: Array<any>;
  id: string;
  modelValue: any;
  label?: string;
  errors?: string[];
}
