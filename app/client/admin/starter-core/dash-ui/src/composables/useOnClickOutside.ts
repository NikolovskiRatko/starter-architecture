import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref, VueElement } from 'vue';

export default function useOnClickOutside(
    component: Ref<VueElement>,
    callback: () => void,
    skip?: boolean
) {
    if (!component) return;

    const listener = (event: Event) => {
        if (
          event.target !== component.value
          && event.composedPath().includes(component.value)
        ) {
            return
        }

        if (typeof callback === 'function') {
            callback()
        }
    }

    onMounted(() => {
        if (!skip) {
            window.addEventListener('click', listener);
        }
    })

    onBeforeUnmount(() => {
        if (!skip) {
            window.removeEventListener('click', listener);
        }
    })

    return { listener }
}
