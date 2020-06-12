import Vue from "vue";

Vue.filter("firestoreTimestampToStringDate", (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);

  let day = date.getDate();
  day = day <= 9 ? `0${day}` : day;

  let month = date.getMonth() + 1;
  month = month <= 9 ? `0${month}` : month;

  return `${day}.${month}.${date.getFullYear()}`;
});
