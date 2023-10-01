# @mapbox-controls/compass

[<< all controls](/README.md)

Control to indicate map direction. Optionally, can be hidden if map bearing iz 0.

```
npm i @mapbox-controls/compass
```

```js
import CompassControl from '@mapbox-controls/compass';
import '@mapbox-controls/compass/src/index.css';

map.addControl(new CompassControl(), 'bottom-right');
```

## Options

```js
export type CompassControlOptions = {
    instant?: boolean;
};
```
