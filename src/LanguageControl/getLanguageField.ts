export default function getLanguageField(lang: string) {
  if (lang === 'mul') {
    return 'name';
  }
  return `name_${lang}`;
}
