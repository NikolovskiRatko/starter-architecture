// Function to deal with undefined values, when you use inject()
import type { InjectionKey } from 'vue';
import type { LayoutConfig } from './common';

export const layoutConfigKey: InjectionKey<LayoutConfig> = Symbol('layoutConfigKey');
