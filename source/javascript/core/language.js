class Language {
  static words = new Map();
  static defaultLanguageCode = 'en';

  static async load(languageCode) {
    try {
      const importModule = await import(`../language/${languageCode}`);
      const importDefaultObject = importModule.default;

      this.setAll(importDefaultObject);
    } catch {
      const importModule = await import(`../language/${this.defaultLanguageCode}.js`);
      const importDefaultObject = importModule.default;

      this.setAll(importDefaultObject);
    }
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
