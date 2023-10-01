# 💅 @mapbox-controls/styles

[<< all controls](/README.md)

Control to change map style among provided.

```
npm i @mapbox-controls/styles
```

```js
import StylesControl from '@mapbox-controls/styles';
import '@mapbox-controls/styles/src/index.css';

map.addControl(new StylesControl(), 'top-left');
// or compact view:
map.addControl(new StylesControl({ compact: true }), 'top-left');
```

## Options

`styleName` - is the root value of style's `name` property according to [the specification](https://docs.mapbox.com/style-spec/reference/root/#name).

```ts
export type Style = {
    label: string;
    styleName: string;
    styleUrl: string;
};

export type StylesControlOptions = {
    styles?: Style[] | undefined;
    onChange?: ((style: Style) => void) | undefined;
    compact?: boolean | undefined;
};
```
