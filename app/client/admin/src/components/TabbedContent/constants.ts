import type { InjectionKey, Ref } from 'vue';
import type { AddTab } from './types';

export const AddTabKey: InjectionKey<AddTab> = Symbol('addTab');
export const ActiveTabIdKey: InjectionKey<Ref<string>> = Symbol('activeTabId');
