[<< all controls](/README.md)

# 🏷️ @mapbox-controls/tooltip

![](https://github.com/korywka/mapbox-controls/assets/988471/ac7b2ba3-352e-48e2-b1fa-79fc73c1b63c)

Control to display tooltip on hover. The content of the tooltip may depend on the data stored in the layer.

```
npm i @mapbox-controls/tooltip
```

```js
import TooltipControl from '@mapbox-controls/tooltip';
import '@mapbox-controls/tooltip/src/index.css';

map.addControl(new TooltipControl({
  getContent: (event) => `${event.lngLat.lng.toFixed(6)}, ${event.lngLat.lat.toFixed(6)}`,
  layer: 'some-layer-id',
}));
```

## Options

```ts
export type ControlOptions = {
    getContent: (event: import("mapbox-gl").MapMouseEvent) => string;
    layer?: string;
};
```
