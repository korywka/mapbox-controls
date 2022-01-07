import { readdir, readFile, writeFile } from 'fs/promises';

const base = import.meta.url;

try {
  const sourcesUrl = new URL('svg', base);
  const files = await readdir(sourcesUrl);
  for (const file of files) {
    const sourceUrl = new URL(`svg/${file}`, base);
    const sourceContent = await readFile(sourceUrl, 'utf8');
    const filename = file.split('.')[0];
    const targetFilename = `${filename}.ts`;
    const targetUrl = new URL(`ts/${targetFilename}`, base);
    await writeFile(targetUrl, [
      `const svg = \`${sourceContent}\`;`,
      '',
      'export default () => (new DOMParser().parseFromString(svg, \'image/svg+xml\')).firstChild as SVGElement;',
      '',
    ].join('\n'));
  }
} catch (error) {
  console.error(error);
}
