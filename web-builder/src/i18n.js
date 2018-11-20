import VueI18n from 'vue-i18n';

const messages = {
  en: {
    hello: 'hello world {msg}'
  },
  ja: {
    hello: 'こんにちは、世界'
  }
}

let i18n = null;

export default {
  install(Vue) {
    Vue.use(VueI18n);

    i18n = new VueI18n({
      locale: 'en', // set locale
      messages, // set locale messages
    })
  }
};


// Create VueI18n instance with options
export { i18n }
