# 📖 @mapbox-controls/language

[<< all controls](/README.md)

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
export type LanguageControlOptions = {
  supportedLanguages?: string[] | undefined;
  language?: string | undefined;
  getLanguageKey?: ((language: string) => string) | undefined;
  excludedLayerIds?: string[] | undefined;
};
```

## Methods

- `setLanguage(lang?: string | undefined): void;` - set dynamically map language