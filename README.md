# Mapbox Controls

Some handy controls for `mapbox-gl-js` structured as monorepo. [Example of all controls](https://korywka.github.io/mapbox-controls/preview/).

<img width="1724" alt="" src="https://github.com/korywka/mapbox-controls/assets/988471/84d96210-1b3c-4004-a456-4933ce34e118">

## Controls list

- [🧭 @mapbox-controls/compass](packages/compass) - Indicate map direction
- [🏙️ @mapbox-controls/image](packages/image) - Move, scale and rotate image on a map
- [🐞 @mapbox-controls/inspect](packages/inspect) - Debug map style layers and sources
- [📖 @mapbox-controls/language](packages/language) - Change map language
- [📏 @mapbox-controls/ruler](packages/ruler) - Measure distance between points on a map
- [💅 @mapbox-controls/styles](packages/styles) - Change map style
- [🏷️ @mapbox-controls/tooltip](packages/tooltip) - Display tooltip on hover
- [🔍 @mapbox-controls/zoom](packages/zoom) - Zoom in and zoom out map

## Development

1. Update versions

```
pnpm -r --filter "./packages/*" exec npm version x.y.z --no-git-tag-version
```

2. Build types
```
pnpm run build
```

3. Publish

```
pnpm run publish
```
