import { watch, type ComputedRef} from "vue";
import { useForm } from 'vee-validate';
import type { UserFormItem } from "@/modules/users/types";

export const useUserForm = (formData?: ComputedRef<unknown>) => {
    const validationSchema = {
        last_name(value: string) {
            if (value?.length >= 5) return true;
            return 'Name needs to be at least 5 characters.';
        },
    };

    const {
        handleSubmit,
        errors,
        setValues,
        defineField,
        setErrors,
    } = useForm<UserFormItem>({
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
        }
    };
}