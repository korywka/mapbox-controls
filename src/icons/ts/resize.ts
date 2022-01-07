const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <rect fill="none" height="24" width="24"/>
    <polygon points="21,11 21,3 13,3 16.29,6.29 6.29,16.29 3,13 3,21 11,21 7.71,17.71 17.71,7.71"/>
</svg>`;

export default () => (new DOMParser().parseFromString(svg, 'image/svg+xml')).firstChild as SVGElement;
