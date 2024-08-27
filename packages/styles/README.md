[<< all controls](/README.md)

# 💅 @mapbox-controls/styles

![](https://github.com/korywka/mapbox-controls/assets/988471/18ac929f-06ff-4043-8b4b-258b876b9585)

Control to change map style among provided.

```
npm i @mapbox-controls/styles
```

```js
import StylesControl from '@mapbox-controls/styles';
import '@mapbox-controls/styles/src/index.css';

map.addControl(new StylesControl(styles: {
  label: 'Streets',
  styleName: 'Mapbox Streets',
  styleUrl: 'mapbox://styles/mapbox/streets-v12',
}, {
  label: 'Satellite',
  styleName: 'Mapbox Satellite Streets',
  styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v12',
}), 'top-left');

// or with compact view and default styles (streets and satellite)
map.addControl(new StylesControl({ compact: true }), 'top-left');
```

Use mapbox [`style.load`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:style.load) event to redraw layers.

## Options

`styleName` - is the root value of style's `name` property according to [the specification](https://docs.mapbox.com/style-spec/reference/root/#name).

```ts
export type Style = {
    label: string;
    styleName: string;
    styleUrl: string;
};

export type ControlOptions = {
    styles?: Style[];
    onChange?: (style: Style) => void;
    compact?: boolean;
};
```
