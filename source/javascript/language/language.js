class Language {
  static words = new Map();
  static defaultLanguageCode = 'en';

  static load(languageCode) {
    import(`./${languageCode}.js`).then(exportedModule => {
      const translationObject = exportedModule.default;

      this.setAll(translationObject);
    }).catch(error => {
      console.warn(error);

      import(`./${this.defaultLanguageCode}.js`).then(exportedModule => {
        const translationObject = exportedModule.default;

        this.setAll(translationObject);
      });
    });
  }

  static get(key) {
    return Language.words.get(key);
  }

  static getAll() {
    return Language.words;
  }

  static set(key, value) {
    return Language.words.set(key, value);
  }

  static setAll(translationObject) {
    Object.entries(translationObject).forEach(elem => {
      this.set(elem[0], elem[1]);
    });
  }

  static delete(key) {
    return Language.words.delete(key);
  }
}

if (globalThis.lang != null) {
  Language.load(globalThis.lang);
}

export default Language;
