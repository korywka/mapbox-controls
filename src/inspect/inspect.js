import iconInspect from './icon-inspect.svg';
import iconLeft from './icon-left.svg';
import iconRight from './icon-right.svg';

function featureData(feature) {
  const props = feature.properties;
  const data = [
    {
      key: '$id',
      value: feature.layer.id,
    },
    {
      key: '$type',
      value: feature.layer.type,
    },
    {
      key: 'source',
      value: feature.layer.source,
    },
    {
      key: 'source-layer',
      value: feature.layer['source-layer'],
    },
  ];

  Object.keys(props)
    .forEach((key) => {
      data.push({
        key,
        value: props[key],
      });
    });

  return data;
}

function popup(features) {
  let current = 0;
  const root = document.createElement('div');
  root.classList.add('mapboxgl-ctrl-inspect-popup');
  const content = document.createElement('div');
  content.classList.add('mapboxgl-ctrl-inspect-content');

  const templatePrev = () => {
    const button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapboxgl-ctrl-inspect-prev');
    button.appendChild(iconLeft());
    button.addEventListener('click', () => goTo('-1'));
    return button;
  };

  const templateNext = () => {
    const button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapboxgl-ctrl-inspect-next');
    button.appendChild((iconRight()));
    button.addEventListener('click', () => goTo('+1'));
    return button;
  };

  const templateTitle = () => {
    const title = document.createElement('div');
    title.classList.add('mapboxgl-ctrl-inspect-current');
    title.textContent = `${current + 1} / ${features.length}`;
    return title;
  };

  const templateHeader = () => {
    const header = document.createElement('div');
    header.classList.add('mapboxgl-ctrl-inspect-header');
    header.appendChild(templatePrev());
    header.appendChild(templateTitle());
    header.appendChild(templateNext());
    return header;
  };

  const templateFeature = (feature) => {
    const table = document.createElement('table');
    table.classList.add('mapboxgl-ctrl-inspect-feature');
    const data = featureData(feature);
    data.forEach((prop) => {
      const row = document.createElement('tr');
      const key = document.createElement('th');
      const value = document.createElement('td');
      key.textContent = prop.key;
      value.textContent = prop.value;
      row.appendChild(key);
      row.appendChild(value);
      table.append(row);
    });

    return table;
  };

  function goTo(dir) {
    if (dir === '-1') {
      current = current !== 0 ? current - 1 : features.length - 1;
    } else if (dir === '+1') {
      current = current !== features.length - 1 ? current + 1 : 0;
    }

    content.innerHTML = '';
    content.appendChild(templateHeader());
    content.appendChild(templateFeature(features[current]));
  }

  root.appendChild(content);

  if (!features.length) {
    content.textContent = 'No features';
  } else {
    if (features.length > 1) {
      content.appendChild(templateHeader());
    }
    content.appendChild(templateFeature(features[current]));
  }

  return root;
}

/**
 * Inspect control to debug style layers and source
 */
export default class InspectControl {
  insertControls() {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-inspect');
    this.button = document.createElement('button');
    this.button.setAttribute('type', 'button');
    this.button.appendChild(iconInspect());
    this.container.appendChild(this.button);
    this.popup = null;
    this.lngLat = null;
    this.clickListener = this.clickListener.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  inspectingOn() {
    this.isInspecting = true;
    this.button.classList.add('-active');
    this.map.on('click', this.clickListener);
    this.map.on('move', this.updatePosition);
    this.map.getCanvas().style.cursor = 'pointer';
  }

  inspectingOff() {
    this.removePopup();
    this.isInspecting = false;
    this.button.classList.remove('-active');
    this.map.off('click', this.clickListener);
    this.map.off('move', this.updatePosition);
    this.map.getCanvas().style.cursor = '';
  }

  getFeatures(event) {
    const selectThreshold = 3;
    const queryBox = [
      [event.point.x - selectThreshold, event.point.y + selectThreshold], // bottom left (SW)
      [event.point.x + selectThreshold, event.point.y - selectThreshold], // top right (NE)
    ];
    return this.map.queryRenderedFeatures(queryBox);
  }

  addPopup(features) {
    this.popup = popup(features);
    this.mapContainer.appendChild(this.popup);
    this.updatePosition();
  }

  removePopup() {
    if (!this.popup) return;
    this.mapContainer.removeChild(this.popup);
    this.popup = null;
  }

  updatePosition() {
    if (!this.lngLat) return;
    const canvasRect = this.canvas.getBoundingClientRect();
    const pos = this.map.project(this.lngLat);
    this.popup.style.left = `${pos.x - canvasRect.left}px`;
    this.popup.style.top = `${pos.y - canvasRect.top}px`;
  }

  clickListener(event) {
    this.lngLat = event.lngLat;
    const features = this.getFeatures(event);
    this.removePopup();
    this.addPopup(features);
  }

  onAdd(map) {
    this.map = map;
    this.mapContainer = this.map.getContainer();
    this.canvas = this.map.getCanvas();
    this.isInspecting = false;
    this.insertControls();
    this.button.addEventListener('click', () => {
      if (this.isInspecting) {
        this.inspectingOff();
      } else {
        this.inspectingOn();
      }
    });
    return this.container;
  }

  onRemove() {
    this.inspectingOff();
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}
