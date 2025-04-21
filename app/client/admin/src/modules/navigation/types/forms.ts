import type { Navigation } from './api';

export type NavigationForm = Pick<Navigation, 'title' | 'slug' | 'visible' | 'parent_id'>;
