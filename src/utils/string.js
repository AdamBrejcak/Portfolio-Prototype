export const removeDiacritics = (string) => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const svkDateStringFromFsTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${day}.${month}.${date.getFullYear()}`;
};
