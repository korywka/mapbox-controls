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
map.on('ruler.change', ({ coordinates }) => console.log('Ruler changed'));
```

## Options

```ts
export type ControlOptions = {
	units?: import('@turf/helpers').Units;
	labelFormat?: (n: number) => string;
	lineLayout?: LineLayerSpecification['layout'];
	linePaint?: LineLayerSpecification['paint'];
	markerLayout?: CircleLayerSpecification['layout'];
	markerPaint?: CircleLayerSpecification['paint'];
	labelLayout?: SymbolLayerSpecification['layout'];
	labelPaint?: SymbolLayerSpecification['paint'];
	invisible?: boolean;
};
```

## Events

| event         | description       |
| ------------- | ----------------- |
| ruler.on      | ruler activated   |
| ruler.off     | ruler deactivated |
| ruler.changed | ruler changed     |

## Methods

Methods are useful for programmatic control (when option `invisible` is `true`):

- `activate(): void;` - activate controls
- `deactivate(): void;` - deactivate control
- `addCoordinate(coordinate: [number, number]): void;` - add new coordinate
