import { computed, type ComputedRef, type Ref } from "vue";

type ClassObject = { [key: string]: boolean };

type CreateBEMClasses = (
  baseClass: string,
  element?: string,
  conditionalClasses?: Ref<ClassObject>,
) => ComputedRef<ClassObject>;

type UseBEMBuilder = (
  baseClass: string,
  baseClassModifiers: Ref<ClassObject>,
) => [
  ComputedRef<ClassObject>,
  (
    element: string,
    elementConditionalClasses?: Ref<ClassObject>,
  ) => ComputedRef<ClassObject>,
];

const createBEMClasses: CreateBEMClasses = (
  baseClass,
  element,
  conditionalClasses,
) =>
  computed(() => {
    const classBody = element ? `${baseClass}__${element}` : baseClass;
    const classes: ClassObject = { [classBody]: true };

    if (conditionalClasses) {
      for (const [className, condition] of Object.entries(
        conditionalClasses.value,
      )) {
        classes[`${classBody}--${className}`] = condition;
      }
    }

    return classes;
  });

export const useBEMBuilder: UseBEMBuilder = (baseClass, baseClassModifiers) => {
  return [
    createBEMClasses(baseClass, undefined, baseClassModifiers),
    (element, elementConditionalClasses) =>
      createBEMClasses(baseClass, element, elementConditionalClasses),
  ];
};
