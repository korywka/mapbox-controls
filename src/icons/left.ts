const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#505050">
    <path d="M14 7l-5 5 5 5V7z"/>
    <path fill="none" d="M24 0v24H0V0h24z"/>
</svg>
`;

export default function () {
  return (new DOMParser().parseFromString(svg, 'image/svg+xml')).firstChild as SVGElement;
}
