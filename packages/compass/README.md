[<< all controls](/README.md)

# 🧭 @mapbox-controls/compass

![](https://github.com/korywka/mapbox-controls/assets/988471/03647bed-7a93-430b-bd49-b4d0b878734d)

Control to indicate map direction. Can be visible or hidden depending on `instant` option if map bearing is 0.

```
npm i @mapbox-controls/compass
```

```js
import CompassControl from '@mapbox-controls/compass';
import '@mapbox-controls/compass/src/index.css';

map.addControl(new CompassControl(), 'bottom-right');
```

## Options

```ts
export type ControlOptions = {
	instant?: boolean;
};
```
