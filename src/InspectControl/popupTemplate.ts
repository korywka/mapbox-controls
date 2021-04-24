import { MapboxGeoJSONFeature } from 'mapbox-gl';
import iconLeft from '../icons/left';
import iconRight from '../icons/right';

enum Direction {
  Next = 'next',
  Prev = 'prev',
}

function getData(feature: MapboxGeoJSONFeature) {
  const props = feature.properties;
  const data = [
    { key: '$id', value: feature.layer.id },
    { key: '$type', value: feature.layer.type },
    { key: 'source', value: feature.layer.source },
    { key: 'source-layer', value: feature.layer['source-layer'] },
  ];

  Object.keys(props).forEach((key) => {
    data.push({ key, value: props[key] });
  });

  return data;
}

export default function popupTemplate(features: MapboxGeoJSONFeature[]) {
  let current = 0;
  const root = document.createElement('div');
  root.classList.add('mapbox-control-inspect-popup');
  const content = document.createElement('div');
  content.classList.add('mapbox-control-inspect-content');

  const templatePrev = () => {
    const button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapbox-control-inspect-prev');
    button.appendChild(iconLeft());
    button.addEventListener('click', () => goTo(Direction.Prev));
    return button;
  };

  const templateNext = () => {
    const button = document.createElement('div');
    button.setAttribute('type', 'button');
    button.classList.add('mapbox-control-inspect-next');
    button.appendChild((iconRight()));
    button.addEventListener('click', () => goTo(Direction.Next));
    return button;
  };

  const templateTitle = () => {
    const title = document.createElement('div');
    title.classList.add('mapbox-control-inspect-current');
    title.textContent = `${current + 1} / ${features.length}`;
    return title;
  };

  const templateHeader = () => {
    const header = document.createElement('div');
    header.classList.add('mapbox-control-inspect-header');
    header.appendChild(templatePrev());
    header.appendChild(templateTitle());
    header.appendChild(templateNext());
    return header;
  };

  const templateFeature = (feature: MapboxGeoJSONFeature) => {
    const table = document.createElement('table');
    table.classList.add('mapbox-control-inspect-feature');
    const data = getData(feature);
    data.forEach((prop) => {
      const row = document.createElement('tr');
      const key = document.createElement('th');
      const value = document.createElement('td');
      key.textContent = prop.key;
      value.textContent = String(prop.value);
      row.appendChild(key);
      row.appendChild(value);
      table.append(row);
    });

    return table;
  };

  function goTo(dir: Direction) {
    if (dir === Direction.Prev) {
      current = current !== 0 ? current - 1 : features.length - 1;
    } else if (dir === Direction.Next) {
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
