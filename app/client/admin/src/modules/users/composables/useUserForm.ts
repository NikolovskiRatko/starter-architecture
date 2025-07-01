import { useForm } from 'vee-validate';
import { watch, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import type { UserFormItem } from '@/modules/users/types';

export const useUserForm = (formData?: ComputedRef<unknown>) => {
  const { t } = useI18n();

  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .required(t('users.validation.first_name.required'))
      .min(2, t('users.validation.first_name.min'))
      .max(255, t('users.validation.first_name.max')),

    last_name: yup
      .string()
      .required(t('users.validation.last_name.required'))
      .min(2, t('users.validation.last_name.min'))
      .max(255, t('users.validation.last_name.max')),

    email: yup
      .string()
      .required(t('users.validation.email.required'))
      .email(t('users.validation.email.invalid'))
      .min(2, t('users.validation.email.min'))
      .max(255, t('users.validation.email.max')),

    password: yup
      .string()
      .required(t('users.validation.password.required'))
      .min(6, t('users.validation.password.between'))
      .max(30, t('users.validation.password.between')),

    password_confirmation: yup
      .string()
      .required(t('users.validation.password.required'))
      .oneOf([yup.ref('password')], t('users.validation.password.confirmed')),

    role: yup.number().required(t('users.validation.role.required')).typeError(t('users.validation.role.invalid')),
  });

  const { handleSubmit, errors, setValues, defineField, setErrors } = useForm<UserFormItem>({
    validationSchema,
  });

  watch(() => {
    if (formData?.value) {
      setValues({
        id: formData.value.id,
        email: formData.value.email,
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        role: formData.value.role,
        is_disabled: formData.value.is_disabled,
      });
    }
  }, [formData]);

  const [lastName] = defineField('last_name');
  const [firstName] = defineField('first_name');
  const [email] = defineField('email');
  const [isDisabled] = defineField('is_disabled');
  const [role] = defineField('role');
  const [password] = defineField('password');
  const [passwordConfirmation] = defineField('password_confirmation');

  return {
    handleSubmit,
    errors,
    setErrors,
    form: {
      lastName,
      firstName,
      email,
      isDisabled,
      role,
      password,
      passwordConfirmation,
    },
  };
};
