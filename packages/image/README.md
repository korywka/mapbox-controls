[<< all controls](/README.md)

# 🏙️ @mapbox-controls/image

![](https://github.com/korywka/mapbox-controls/assets/988471/9db0c22d-662a-43fb-90e6-1fbe4405dcc5)

Control to move, scale, rotate image (raster layer) on top of a map.
Very handy to represent information from the raster to geojson, for example, the contours of buildings.

```
npm i @mapbox-controls/image
```

```js
import ImageControl from '@mapbox-controls/image';
import '@mapbox-controls/image/src/index.css';

const imageControl = new ImageControl();
map.addControl(imageControl, 'bottom-right');
```

## Options

```ts
export type ControlOptions = {
    removeButton?: boolean;
};
```

## Events

| event          | description                |
| -------------- | -------------------------- |
| image.select   | selected new image         |
| image.deselect | image was deselected       |
| image.mode     | transform mode was changed |
| image.update   | position was updated       |
| image.add      | new image added            |
| image.remove   | image removed              |

## Methods

Methods are useful for programmatic control (when option `invisible` is `true`):

- `addFile(file: File, coordinates?: [number, number][] | undefined): Promise<string>;` - add new image by file. raster id is returned
- `addUrl(url: string, coordinates?: [number, number][] | undefined): Promise<string>;` - add new image by url. raster id is returned
- `setLock: (id: string, isLocked: boolean) => void;` - lock or unlock image. locked image can't be selected
- `removeRaster: () => void;` - removes selected raster from the map

If image was added without `coordinates` parameter, the image is scaled down to be fully visible and placed at the center of the viewport.

Other methods may help to use this control without buttons, these methods are described in type definitions `.d.ts`.

## Change paint properties

Paint properties can be changed dynamically.
Below is an example how to control image opacity by slider (full implementation is available in [preview](/preview/preview.js)).

```js
map.on('image.select', ({ id }) => {
  const rasterLayerId = image.rasters[id].rasterLayer.id;
  const range = document.createElement('input');
  range.style.position = 'absolute';
  range.style.left = '50%';
  range.style.transform = 'translateX(-50%)';
  range.style.bottom = '16px';
  range.type = 'range';
  range.min = 0;
  range.step = 0.05;
  range.max = 1;
  range.value = map.getPaintProperty(rasterLayerId, 'raster-opacity');
  range.addEventListener('input', () => {
    map.setPaintProperty(rasterLayerId, 'raster-opacity', Number(range.value));
  });
  document.body.appendChild(range);
  map.once('image.deselect', () => {
    document.body.removeChild(range);
  });
});
```
