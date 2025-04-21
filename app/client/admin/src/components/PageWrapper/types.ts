import type { PAGE_WRAPPER_SLOTS } from './constants';

export type PageWrapperSlot = (typeof PAGE_WRAPPER_SLOTS)[keyof typeof PAGE_WRAPPER_SLOTS];
