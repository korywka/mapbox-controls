export interface Style {
	label: string;
	styleName: string;
	styleUrl: string;
}

export interface ControlOptions {
	styles?: Style[];
	onChange?: (style: Style) => void;
	compact?: boolean;
}
