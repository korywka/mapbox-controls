import { Expression, StyleFunction } from 'mapbox-gl';

export default function localizeTextField(field: string | StyleFunction | Expression, lang: string) {
  if (typeof field === 'string') {
    return field.replace(/{name.*?}/, `{${lang}}`);
  }

  const str = JSON.stringify(field);

  if (Array.isArray(field)) {
    return JSON.parse(str.replace(
      /"coalesce",\["get","name.*?"]/g,
      `"coalesce",["get","${lang}"]`,
    ));
  }

  return JSON.parse(str.replace(/{name.*?}/g, `{${lang}}`));
}
