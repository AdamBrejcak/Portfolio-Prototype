import Vue from "vue";
import firebase from "firebase";
import DB from "../firebaseInit";
import { svkDateStringFromFsTimestamp } from "../utils/string";

//
// STATE
//
const store = Vue.observable({
  loader: {
    showLoader: true,
    loadingProgress: 0,
    loaderDone: false,
    dbLoaded: false,
  },
  darkMode: false,
  sections: [],
});

//
// GETTERS
//
export const getters = {
  store() { return store; },
  loader() { return store.loader; },
  sections() { return store.sections; },
};

//
// METHODS
//
/*
*  Dotiahne vsetky sekcie staci spustit raz na zaciatku inicializacie stranky.
*  Potom su vsetky sekcie ulozene v store.
* */
export const getSections = async () => {
  try {
    const sectionsRef = await DB
      .collection("section")
      .get();

    store.sections = sectionsRef.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        dateString: svkDateStringFromFsTimestamp(data.date),
        ...doc.data(),
      };
    });
  } catch (err) {
    console.error(err);
  }
};

/** *
*  Prida novu sekciu do databazy. BEZ UPLOADU!!!
*  @argument1 = request sekcie, ktory ide do DB.
* */
export const addSection = async (request) => {
  try {
    const docRef = await DB
      .collection("section")
      .add(request);

    store.sections.unshift({
      id: docRef.id,
      ...request,
    });
  } catch (err) {
    console.error(err);
  }
};

/** *
*  Upravy sekciu. BEZ UPLOADU!!!
*  @argument1 = request sekcie, ktory ide do DB s ID sekcie.
* */
export const updateSection = async (request) => {
  try {
    const { id } = request;
    const edittedRequest = request;
    edittedRequest.id = undefined;
    delete edittedRequest.id;

    await DB
      .collection("section")
      .doc(id)
      .set(edittedRequest);

    const index = store.sections.findIndex((section) => section.id === id);

    store.sections[index] = request;
  } catch (err) {
    console.error(err);
  }
};

/** *
*  Upload file do google cloud storegu.
*  Ak prebehne vsetko v poriadku funkcia vrati Promise, ktory po dokonceni vrati URL.
*  Ak nastane error vrati undefined
*  @argument1 = cesta v store kde sa ma ulozit.
*  @argument2 = file
* */
export const uploadFile = (path, file) => { // eslint-disable-line
  try {
    const storageRef = firebase.storage().ref(path);
    const task = storageRef.put(file);

    return new Promise((resolve) => {
      task.on(
        "state_changed",
        (snapshot) => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${percentage.toFixed(0)}%`);
        },
        () => {
          console.error("Nepodarilo sa uploadnut fotku");
        },
        () => {
          storageRef.getDownloadURL()
            .then((url) => {
              resolve(url);
            })
            .catch((err) => {
              console.error(err);
            });
        },
      );
    });
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
