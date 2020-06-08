export const removeDiacritics = (string) => { // eslint-disable-line
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
