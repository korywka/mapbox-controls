import mapboxgl from 'mapbox-gl';
import Prism from 'prismjs';
import { LocalizationControl } from '../../dist/index';

export default () => {
  const map = new mapboxgl.Map({
    container: 'map-localization',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [30.5234, 50.4501],
    scrollZoom: false,
  });
  const setCode = (locale = '') => {
    const code = document.querySelector('#code-localization');
    if (locale !== '') locale = `'${locale}'`;
    code.textContent =
      `import { LocalizationControl } from 'mapbox-gl-controls';

map.addControl(new LocalizationControl(${locale}));

// Is is possible to change language dynamically anytime:
map.setLanguage(locale);`;
    Prism.highlightElement(code);
  };

  map.addControl(new LocalizationControl());

  map.on('load', () => {
    const radio = document.querySelectorAll('[name="language"]');
    [].forEach.call(radio, (r) => {
      r.addEventListener('change', (event) => {
        const { value } = event.target;
        if (value === 'browser') {
          map.setLanguage();
          setCode();
        } else {
          map.setLanguage(value);
          setCode(value);
        }
      });
    });
  });

  setCode();
};
