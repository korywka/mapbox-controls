[<< all controls](/README.md)

# 🐞 @mapbox-controls/inspect

![](https://github.com/korywka/mapbox-controls/assets/988471/51eaee3e-1f4d-4e9a-b177-fd36f8c5ece1)

Control to debug map style layers and sources.

⚠️ Inspect Control doesn't work with new MapBox Standard style, since the MapBox API [doesn't work](https://github.com/mapbox/mapbox-gl-js/issues/13160) as documentated.

```
npm i @mapbox-controls/inspect
```

```js
import InspectControl from '@mapbox-controls/inspect';
import '@mapbox-controls/inspect/src/index.css';

map.addControl(new InspectControl(), 'bottom-right');
```

## Options

```ts
export type ControlOptions = {
    console?: boolean;
};
```
