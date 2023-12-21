export function controlContainer(className: string): HTMLDivElement;
export function controlButton(options?: {
    title?: string | undefined;
    icon?: Node | undefined;
    textContent?: string | undefined;
    disabled?: boolean | undefined;
    hidden?: boolean | undefined;
    className?: string | undefined;
    onClick?: (() => void) | undefined;
}): HTMLButtonElement;
export function parseSVG(string: string): SVGElement;
