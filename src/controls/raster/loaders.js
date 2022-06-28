import Layer from './picture.js';

/**
 * @param {import('mapbox-gl').Map} map
 * @param {File} file
 * @return {Promise<Layer>}
 */
export function fromFile(map, file) {
  return new Promise(((resolve, reject) => {
    const reader = new FileReader();
    const node = new Image();

    reader.addEventListener('load', () => {
      const imageUrl = /** @type {string} */(reader.result);

      node.onload = () => {
        const picture = new Layer({
          id: file.name,
          url: imageUrl,
          width: node.width,
          height: node.height,
          position: Layer.centerMapPosition(map, node.width, node.height),
        });
        resolve(picture);
      };

      node.onerror = reject;
      node.src = imageUrl;
    }, false);

    reader.readAsDataURL(file);
  }));
}

/**
 * @param {import('mapbox-gl').Map} map
 * @param {string} url
 * @return {Promise<Layer>}
 */
export function fromUrl(map, url) {
  return new Promise(((resolve, reject) => {
    const node = new Image();
    node.onload = () => {
      const picture = new Layer({
        id: /** @type string */(url.split('/').pop()),
        url,
        width: node.width,
        height: node.height,
        position: Layer.centerMapPosition(map, node.width, node.height),
      });
      resolve(picture);
    };

    node.onerror = reject;
    node.src = url;
  }));
}
