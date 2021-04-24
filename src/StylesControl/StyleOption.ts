export interface StyleOption {
  /** Style label to display on switcher */
  label: string;
  /* [Style name from spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/#root-name) */
  styleName: string;
  /* Style url */
  styleUrl: string;
}

export const defaultStyleOptions: StyleOption[] = [
  {
    label: 'Streets',
    styleName: 'Mapbox Streets',
    styleUrl: 'mapbox://styles/mapbox/streets-v11',
  }, {
    label: 'Satellite',
    styleName: 'Mapbox Satellite Streets',
    styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v11',
  },
];
