[<< all controls](/README.md)

# 📏 @mapbox-controls/ruler

![](https://github.com/korywka/mapbox-controls/assets/988471/1c90555c-2e22-4785-8365-14c1bacabb18)

Control to measure distance between points on a map.

```
npm i @mapbox-controls/ruler
```

```js
import RulerControl from '@mapbox-controls/ruler';
import '@mapbox-controls/ruler/src/index.css';

map.addControl(new RulerControl(), 'bottom-right');
map.on('ruler.on', () => console.log('Ruler activated'));
map.on('ruler.off', () => console.log('Ruler deactivated'));
```

## Options

```ts
export type Units = import('@turf/helpers').Units;

export type RulerControlOptions = {
  units?: import("@turf/helpers").Units | undefined;
  labelFormat?: ((n: number) => string) | undefined;
  symbolLayout?: mapboxgl.SymbolLayout | undefined;
  symbolPaint?: mapboxgl.SymbolPaint | undefined;
  lineLayout?: mapboxgl.LineLayout | undefined;
  linePaint?: mapboxgl.LinePaint | undefined;
  markerCSS?: Partial<CSSStyleDeclaration> | undefined;
  invisible?: boolean | undefined;
};
```

## Events

| event     | description       |
| --------- | ----------------- |
| ruler.on  | ruler activated   |
| ruler.off | ruler deactivated |

## Methods

Methods are useful for programmatic control (when option `invisible` is `true`):

- `activate(): void;` - activate controls
- `deactivate(): void;` - deactivate control
- `addCoordinate(coordinate: [number, number]): void;` - add new coordinate
