// Lowercases and strips diacritics so "samana" matches "Samaná", etc.
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
