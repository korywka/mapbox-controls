import type { GeoJSONFeature, LayerSpecification } from 'mapbox-gl';

function html(features: GeoJSONFeature[], current: number): string {
	const feature = features[current];
	const withProperties = feature.properties && Object.keys(feature.properties).length;
	const properties = feature.properties || {};
	const layer = feature.layer as LayerSpecification;

	return `
    <header>
      ${features.length > 1 ? '<button data-prev>←</button>' : ''}
      <nav>
        ${current + 1} / ${features.length}
      </nav>
      ${features.length > 1 ? '<button data-next>→</button>' : ''}
    </header>
    <table>
      ${feature.id ? `<tr><th>$id</th><td>${feature.id}</td></tr>` : ''}
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
      ${withProperties ? '<tr><td colspan="2">properties</td></tr>' : ''}
      ${
				withProperties
					? Object.entries(properties)
							.map(([key, value]) => `<tr><th>${key}</th><td>${value}</td></tr>`)
							.join('')
					: ''
			}
    </table>
  `;
}

export function popup(features: GeoJSONFeature[]): HTMLDivElement {
	const node = document.createElement('div');
	let current = 0;
	node.classList.add('mapgl-inspect-popup');

	if (!features.length) {
		node.textContent = 'No features';
		return node;
	}

	node.innerHTML = html(features, current);

	node.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;
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
