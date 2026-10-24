import type { StyleSpecification } from 'mapbox-gl';

export interface Style {
	label: string;
	style: string | (StyleSpecification & { name: string });
}

export interface ControlOptions {
	styles: Style[];
	onChange?: (style: Style) => void;
	compact?: boolean;
}
