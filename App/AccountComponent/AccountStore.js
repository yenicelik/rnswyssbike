import {firebase} from '../firebase.js';

class AccountStore {

  constructor() {
    this.loggedIn = false;
  }

  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then( () => {
      console.log("User logged in! Current user is: ");
      console.log(JSON.stringify(firebase.auth().currentUser));
      this.loggedIn = true;
    })
    .catch( (error) => {
      console.log("Firebase login gave an error");
      console.log(JSON.stringify(error));
    });
  }

  signup(email, password) {
    console.log("Firebase object is: ");
    return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User created! Current user is");
      console.log(JSON.stringify(firebase.auth().currentUser));
      this.loggedIn = true;
    })
    .catch((error) => {
      console.log("Firebase signup error");
      console.log(JSON.stringify(error));
    });
  }

  async logout() {
    try {
        await firebase.auth().signOut();
        //also, remove the tokens from local storage and also variable storage
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }
}

let accountStore;
export function getAccountStore() {
  if (!accountStore) {
    accountStore = new AccountStore();
  }
  return accountStore;
}
