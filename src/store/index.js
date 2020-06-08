import Vue from "vue";
import firebase from "firebase";
import DB from "../firebaseInit";

//
// STATE
//
export const store = Vue.observable({
  loading: false,
  loadingProgress: 0,
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
    store.loading = true;

    const sectionsRef = await DB
      .collection("section")
      .get();

    store.sections = sectionsRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    store.loading = false;
  } catch (err) {
    console.error(err);
    store.loading = false;
  }
};

/** *
*  Prida novu sekciu do databazy. BEZ UPLOADU!!!
*  @argument 1 = request sekcie, ktory ide do DB.
* */
export const addSection = async (request) => {
  try {
    store.loading = true;

    const docRef = await DB
      .collection("section")
      .add(request);

    store.sections.unshift({
      id: docRef.id,
      ...request,
    });

    store.loading = false;
  } catch (err) {
    console.error(err);
  }
};

/** *
*  Upravy sekciu. BEZ UPLOADU!!!
*  @argument 1 = request sekcie, ktory ide do DB s ID sekcie.
* */
export const updateSection = async (request) => {
  try {
    store.loading = true;

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
*  @argument 1 = cesta v store kde sa ma ulozit.
*  @argument 2 = file
* */
export const uploadFile = (path, file) => {
  try {
    store.loading = true;
    const storageRef = firebase.storage().ref(path);
    const task = storageRef.put(file);

    return new Promise((resolve) => {
      task.on(
        "state_changed",
        (snapshot) => {
          store.loadingProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        () => {
          store.loading = false;
          console.error("Nepodarilo sa uploadnut fotku");
        },
        () => {
          storageRef.getDownloadURL()
            .then((url) => {
              store.loading = false;
              store.loadingProgress = 0;
              resolve(url);
            })
            .catch((err) => {
              console.error(err);
              store.loading = false;
            });
        },
      );
    });
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
