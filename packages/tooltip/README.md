# @mapbox-controls/tooltip

[<< all controls](/README.md)

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

```js
export type TooltipControlOptions = {
    getContent: (event: MapLayerMouseEvent) => string;
    layer?: string | undefined;
};
```
