export const removeDiacritics = (string) => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const getGalleryLink = (sectionName) => {
  const urlParam = removeDiacritics(sectionName).split(" ").join("_").toLowerCase();
  return `/gallery/${urlParam}`;
};
