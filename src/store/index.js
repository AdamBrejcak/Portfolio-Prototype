import Vue from "vue";
import firebase from "firebase";
import DB from "../firebaseInit";

//
// STATE
//
export const store = Vue.observable({
  loadingText: null,
  sections: [],
});

//
// GETTERS
//
export const getters = {
  store() { return store; },
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
    store.loadingText = "Loading...";

    const sectionsRef = await DB
      .collection("section")
      .get();

    store.sections = sectionsRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    store.loadingText = null;
  } catch (err) {
    console.error(err);
    store.loadingText = null;
  }
};

/** *
*  Prida novu sekciu do databazy. BEZ UPLOADU!!!
*  @argument1 = request sekcie, ktory ide do DB.
* */
export const addSection = async (request) => {
  try {
    store.loadingText = "Saving...";

    const docRef = await DB
      .collection("section")
      .add(request);

    store.sections.unshift({
      id: docRef.id,
      ...request,
    });

    store.loadingText = null;
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
    store.loadingText = "Updating...";

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
    store.loadingText = null;
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
    store.loadingText = "Uploading...";
    const storageRef = firebase.storage().ref(path);
    const task = storageRef.put(file);

    return new Promise((resolve) => {
      task.on(
        "state_changed",
        () => {},
        () => {
          store.loadingText = null;
          console.error("Nepodarilo sa uploadnut fotku");
        },
        () => {
          storageRef.getDownloadURL()
            .then((url) => {
              store.loadingText = null;
              resolve(url);
            })
            .catch((err) => {
              console.error(err);
              store.loadingText = null;
            });
        },
      );
    });
  } catch (err) {
    console.error(err);
    store.loadingText = null;
    return undefined;
  }
};
