import { computed, type ComputedRef, type Ref } from "vue";

type ClassObject = { [key: string]: boolean };

type CreateBEMClasses = (
  baseClass: string,
  element?: string,
  conditionalClasses?: Ref<ClassObject>,
) => ComputedRef<ClassObject>;

type UseBEMBuilder = (
  baseClass: string,
  baseClassModifiers?: Ref<ClassObject>,
) => [
  ComputedRef<ClassObject>,
  (
    element: string,
    elementConditionalClasses?: Ref<ClassObject>,
  ) => ComputedRef<ClassObject>,
];

export const useBEMBuilder: UseBEMBuilder = (baseClass, baseClassModifiers) => {
  const createBEMClasses: CreateBEMClasses = (
    base,
    element,
    conditionalClasses,
  ) =>
    computed(() => {
      const classBody = element ? `${base}__${element}` : base;
      const classes: ClassObject = { [classBody]: true };

      if (conditionalClasses?.value) {
        for (const [className, condition] of Object.entries(
          conditionalClasses.value,
        )) {
          classes[`${classBody}--${className}`] = condition;
        }
      }
      return classes;
    });

  return [
    createBEMClasses(baseClass, undefined, baseClassModifiers),
    (element, elementModifiers) =>
      createBEMClasses(baseClass, element, elementModifiers),
  ];
};
