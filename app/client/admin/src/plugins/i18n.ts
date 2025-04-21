import { createI18n } from 'vue-i18n';
// import en from "@/locales/en.json";
import * as en from '@/locales/en';
import * as mk from '@/locales/mk';

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'en',
  locale: 'en',
  messages: {
    en,
    mk,
  },
});
