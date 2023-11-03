import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import mk from '@/locales/mk.json'

export default (app) => {
  app.use(createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en,
      mk
    }
  }))
}
