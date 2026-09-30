export function createFileInput() {
	const node = document.createElement('input');
	node.type = 'file';
	node.accept = '.jpg, .jpeg, .png';
	node.multiple = false;
	return node;
}

export function readFile(file: File): Promise<HTMLImageElement> {
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

export function readUrl(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const node = document.createElement('img');
		node.onload = () => {
			resolve(node);
		};
		node.onerror = reject;
		node.src = url;
	});
}
