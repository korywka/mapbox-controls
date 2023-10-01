# @mapbox-controls/zoom

[<< all controls](/README.md)

Control to zoom in and zoom out map. The difference between the standard ones is that they are not combined with a compass control.

```
npm i @mapbox-controls/zoom
```

```js
import ZoomControl from '@mapbox-controls/zoom';
import '@mapbox-controls/zoom/src/index.css';

map.addControl(new ZoomControl(), 'bottom-right');
```