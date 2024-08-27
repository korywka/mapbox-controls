export type Style = {
    label: string;
    styleName: string;
    styleUrl: string;
};
export type ControlOptions = {
    styles?: Style[];
    onChange?: (style: Style) => void;
    compact?: boolean;
};
