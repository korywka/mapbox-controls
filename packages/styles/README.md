[<< all controls](/README.md)

# 💅 @mapbox-controls/styles

![](https://github.com/korywka/mapbox-controls/assets/988471/18ac929f-06ff-4043-8b4b-258b876b9585)

Control to change map style among provided.

```
npm i @mapbox-controls/styles
```

```js
import StylesControl from "@mapbox-controls/styles";
import "@mapbox-controls/styles/src/index.css";

const styles = [
  {
    label: "Streets",
    style: "mapbox://styles/mapbox/streets-v12",
  },
  {
    label: "Satellite",
    style: "mapbox://styles/mapbox/satellite-streets-v12",
  },
];

map.addControl(new StylesControl({ styles }), "top-left");

// or with compact view
map.addControl(new StylesControl({ styles, compact: true }), "top-left");
```

`style` is a style URL or a style object. The control selects the current map style: a URL by the URL, an object by its `name`.

```js
const osm = {
  version: 8,
  name: "OpenStreetMap",
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

map.addControl(new StylesControl({ styles: [...styles, { label: "OSM", style: osm }] }));
```

Switching rebuilds the whole style, so sources and layers added at runtime are removed: use [`style.load`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:style.load) event to redraw them.

## Options

```ts
export type Style = {
  label: string;
  style: string | (StyleSpecification & { name: string });
};

export type ControlOptions = {
  styles: Style[];
  onChange?: (style: Style) => void;
  compact?: boolean;
};
```
