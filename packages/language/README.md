[<< all controls](/README.md)

# 📖 @mapbox-controls/language

![](https://github.com/korywka/mapbox-controls/assets/988471/b2984a79-73f0-43e2-96b3-782b4b9970dc)

Localize map or change dynamically language.

By default, supported languages option is [the supported list](https://docs.mapbox.com/data/tilesets/reference/mapbox-streets-v8/#common-fields) by mapbox styles.

```
npm i @mapbox-controls/language
```

```js
// set language from browser, use 'mul' as fallback
map.addControl(new LanguageControl());

// set custom language while initialization
const languageControl = new LanguageControl({
  language: 'ru',
});
map.addControl(languageControl);

// or change language dynamically
languageControl.setLanguage(event.target.value);
```

## Options

```ts
export type ControlOptions = {
    supportedLanguages?: string[];
    language?: string;
    getLanguageKey?: (language: string) => string;
    excludedLayerIds?: string[];
};
```

## Methods

- `setLanguage(lang?: string | undefined): void;` - set dynamically map language
