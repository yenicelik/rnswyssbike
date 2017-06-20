import firebase from '../firebase';

class pFirebaseLogin {
  async logout() {
    try {
        await firebase.auth().signOut();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }
}
