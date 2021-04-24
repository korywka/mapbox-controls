# Mapbox Controls

[![Preview](./docs/map.png)](https://bravecow.github.io/mapbox-gl-controls/)

### Usage

```bash
npm install mapbox-gl-controls
```

Include styles from package: `mapbox-gl-controls/lib/controls.css`

### Ruler Control

```javascript
import { RulerControl } from 'mapbox-gl-controls';

map.addControl(new RulerControl(), 'top-right');
map.on('ruler.on', () => console.log('ruler: on'));
map.on('ruler.off', () => console.log('ruler: off'));

// with miles:
map.addControl(new RulerControl({
  units: 'miles',
  labelFormat: n => `${n.toFixed(2)} ml`,
}), 'top-right');
```

### Styles Control

```javascript
import { StylesControl } from 'mapbox-gl-controls';

// with default styles:
map.addControl(new StylesControl(), 'top-left');

// with custom styles:
map.addControl(new StylesControl({
  styles: [
    {
      label: 'Streets',
      styleName: 'Mapbox Streets',
      styleUrl: 'mapbox://styles/mapbox/streets-v9',
    }, {
      label: 'Satellite',
      styleName: 'Satellite',
      styleUrl: 'mapbox://styles/mapbox/satellite-v9',
    },
  ],
  onChange: (style) => console.log(style),
}), 'top-left');
```

### Compass Control

```javascript
import { CompassControl } from 'mapbox-gl-controls';

map.addControl(new CompassControl(), 'top-right');
```

### Zoom Control

```javascript
import { ZoomControl } from 'mapbox-gl-controls';

map.addControl(new ZoomControl(), 'top-right');
```

### Language Control

```javascript
import { LanguageControl } from 'mapbox-gl-controls';

// with browser detect:
map.addControl(new LanguageControl());

// with custom language:
const languageControl = new LanguageControl({
  language: 'ru',
});
map.addControl(languageControl);

// change language to multi language after control has been added:
languageControl.setLanguage('mul');
```

### Inspect Control

```javascript
import { InspectControl } from 'mapbox-gl-controls';

map.addControl(new InspectControl(), 'bottom-right');
```

### Tooltip Control

```javascript
import { TooltipControl } from 'mapbox-gl-controls';

map.addControl(new TooltipControl({ layer: '$fill' }));
```
