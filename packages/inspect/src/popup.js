/**
 * @param {import('mapbox-gl').GeoJSONFeature[]} features
 * @param {number} current
 * @returns {string}
 */
function html(features, current) {
	const feature = features[current];
	const withProperties = feature.properties && Object.keys(feature.properties).length;
	const properties = feature.properties || {};
	const layer = /** @type {import('mapbox-gl').LayerSpecification} */ (feature.layer);

	return (`
    <header>
      ${features.length > 1 ? '<button data-prev>←</button>' : ''}
      <nav>
        ${current + 1} / ${features.length}
      </nav>
      ${features.length > 1 ? '<button data-next>→</button>' : ''}
    </header>
    <table>
      ${feature.id ? (`
        <tr>
          <th>$id</th>
          <td>${feature.id}</td>
        </tr>  
      `) : ''}
      <tr>
        <td colspan="2">layer</td>
      </tr>
      <tr>
        <th>id</th>
        <td>${layer.id}</td>
      </tr>
      <tr>
        <th>type</th>
        <td>${layer.type}</td>
      </tr>
      <tr>
        <th>source</th>
        <td>${layer.source}</td>
      </tr>
      <tr>
        <th>source-layer</th>
        <td>${layer['source-layer'] ?? '-'}</td>
      </tr>
      ${withProperties ? (`
        <tr>
          <td colspan="2">properties</td>
        </tr>
      `) : ''}
      ${withProperties ? Object.entries(properties).map(([key, value]) => (`
        <tr>
          <th>${key}</th>
          <td>${value}</td>
        </tr>  
      `)).join('') : ''}
    </table>
  `);
}

/**
 * @param {import('mapbox-gl').GeoJSONFeature[]} features
 * @returns {HTMLDivElement}
 */
export function popup(features) {
	const node = document.createElement('div');
	let current = 0;
	node.classList.add('mapbox-ctrl-inspect-popup');

	if (!features.length) {
		node.textContent = 'No features';
		return node;
	}

	node.innerHTML = html(features, current);

	node.addEventListener('click', (event) => {
		const target = /** @type {HTMLElement} */(event.target);
		if (target.matches('[data-prev]')) {
			const isFirst = current === 0;
			current = isFirst ? features.length - 1 : current - 1;
		} else if (target.matches('[data-next]')) {
			const isLast = current === features.length - 1;
			current = isLast ? 0 : current + 1;
		}
		node.innerHTML = '';
		node.innerHTML = html(features, current);
	});

	return node;
}
