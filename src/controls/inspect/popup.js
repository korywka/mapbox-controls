import iconLeft from '../../icons/js/left.js';
import iconRight from '../../icons/js/right.js';

/**
 * @enum {string}
 */
const Direction = {
  next: 'next',
  prev: 'prev',
};

/**
 * @param {import('mapbox-gl').MapboxGeoJSONFeature} feature
 * @returns {(string | {key: string, value: any})[]}
 */
function getData(feature) {
  const layerData = [
    'layer',
    { key: 'id', value: feature.layer.id },
    { key: 'type', value: feature.layer.type },
    { key: 'source', value: feature.layer.source },
    { key: 'source-layer', value: feature.layer['source-layer'] ?? '—' },
  ];

  /**
   * @type {(string | {key: string, value: any})[]}
   */
  const featureData = ['properties'];

  if (feature.id) {
    featureData.push({ key: '$id', value: feature.id });
  }

  if (feature.properties) {
    Object.entries(feature.properties).forEach(([key, value]) => {
      featureData.push({ key, value });
    });
  }

  if (featureData.length === 1) {
    featureData.pop(); // remove title if there are no properties
  }

  return [...layerData, ...featureData];
}

/**
 * @param {import('mapbox-gl').MapboxGeoJSONFeature[]} features
 * @returns {HTMLDivElement}
 */
export default function popup(features) {
  let current = 0;
  const root = document.createElement('div');
  root.classList.add('mapbox-control-inspect-popup');
  const content = document.createElement('div');
  content.classList.add('mapbox-control-inspect-content');

  function templatePrev() {
    const button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapbox-control-inspect-prev');
    button.appendChild(iconLeft());
    button.addEventListener('click', () => goTo(Direction.prev));

    return button;
  }

  function templateNext() {
    const button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapbox-control-inspect-next');
    button.appendChild((iconRight()));
    button.addEventListener('click', () => goTo(Direction.next));

    return button;
  }

  function templateTitle() {
    const title = document.createElement('div');
    title.classList.add('mapbox-control-inspect-current');
    title.textContent = `${current + 1} / ${features.length}`;

    return title;
  }

  function templateHeader() {
    const header = document.createElement('div');
    header.classList.add('mapbox-control-inspect-header');
    header.appendChild(templatePrev());
    header.appendChild(templateTitle());
    header.appendChild(templateNext());

    return header;
  }

  /**
   * @param {import('mapbox-gl').MapboxGeoJSONFeature} feature
   * @returns {HTMLTableElement}
   */
  function templateFeature(feature) {
    const table = document.createElement('table');
    table.classList.add('mapbox-control-inspect-grid');
    const data = getData(feature);
    data.forEach((record) => {
      const row = document.createElement('tr');
      if (typeof record === 'string') {
        const caption = document.createElement('th');
        caption.classList.add('mapbox-control-inspect-caption');
        caption.colSpan = 2;
        caption.textContent = record;
        row.appendChild(caption);
        table.append(row);

        return;
      }

      const key = document.createElement('th');
      const value = document.createElement('td');
      key.classList.add('mapbox-control-inspect-key');
      value.classList.add('mapbox-control-inspect-value');
      key.textContent = record.key;
      value.textContent = String(record.value);
      row.appendChild(key);
      row.appendChild(value);
      table.append(row);
    });

    return table;
  }

  /**
   * @param {Direction} dir
   */
  function goTo(dir) {
    if (dir === Direction.prev) {
      current = current !== 0 ? current - 1 : features.length - 1;
    } else if (dir === Direction.next) {
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
