import {firebase} from '../firebase.js';
import {AsyncStorage} from 'react-native';


class AccountStore {

  constructor() {
    this.loggedIn = false;
    var email, pass = this.getUserEmailAndPassword(); //both values must not be null
    if (email && pass) {
      this.loggedIn = true;
    }
  }

  /** STORAGE OPERATIONS */
  async saveUserEmailAndPassword(email, pass) {
    try {
      await AsyncStorage.setItem('@LocalStore:userMail', email);
      await AsyncStorage.setItem('@LocalStore:userPass', pass);
      return true
    } catch (error) {
      console.log("Some funky error with AsyncStorage from within save Password and E-Mail");
      console.log(error.message);
      return false
    }
  }

  async getUserEmailAndPassword() {
    try {
      await AsyncStorage.getItem('@LocalStore:userMail')
      .then( (email) => {
        AsyncStorage.getItem('@LocalStore:userPass')
        .then( (pass) => {
          if(email != null && pass != null) {
            return email, pass
          } else {
            return null, null
          }
        });
      });
    } catch (error) {
      console.log("Some funky errror with AsyncStorage from within get Password and E-Mail");
      consoe.log(error.message);
    }
  }
  /*/ STORAGE OPERATIONS */

  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then( () => {
      this.saveUserEmailAndPassword(email, password);
      this.loggedIn = true;
    })
    .catch( (error) => {
      console.log("Firebase login gave an error");
      console.log(JSON.stringify(error));
    });
  }

  signup(email, password) {
    return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.saveUserEmailAndPassword(email, password);
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
