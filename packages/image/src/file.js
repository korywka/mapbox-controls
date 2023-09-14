export function createFileInput() {
	const node = document.createElement('input');
	node.type = 'file';
	node.accept = '.jpg, .jpeg, .png';
	node.multiple = false;
	return node;
}

/**
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
export function readFile(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const node = document.createElement('img');
		node.onload = () => {
			resolve(node);
		};
		node.onerror = reject;
		node.src = url;
	});
}

/**
 * @param {string} url
 * @return {Promise<HTMLImageElement>}
 */
export function readUrl(url) {
	return new Promise(((resolve, reject) => {
		const node = document.createElement('img');
		node.onload = () => {
			resolve(node);
		};
		node.onerror = reject;
		node.src = url;
	}));
}
