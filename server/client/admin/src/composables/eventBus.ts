import { ref, Ref } from "vue";

type EventMap = Map<string, unknown[]>;

const bus: Ref<EventMap> = ref(new Map());

export function useEventsBus() {
  function emit(event: string, ...args: unknown[]) {
    bus.value.set(event, args);
  }

  return {
    emit,
    bus,
  };
}
