# 🐞 @mapbox-controls/inspect

[<< all controls](/README.md)

Control to debug map style layers and sources.

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
export type InspectControlOptions = {
	console?: boolean;
};
```