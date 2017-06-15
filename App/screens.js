import { Navigation } from 'react-native-navigation';

import AccountComponent from './Components/AccountComponent.js';
import BookbikeComponent from './Components/BookbikeComponent.js';
import FeedbackComponent from './Components/FeedbackComponent.js';
import LoginComponent from './Components/LoginComponent.js';
import MapComponents from './Components/MapComponents.js';
import MarkersComponent from './Components/MarkersComponent.js';
import SignupComponent from './Components/SignupComponent.js';
import SuccessBookedBike from './Components/SuccessBookedBike.js';
import EndBookedBike from './Components/EndBookedBike.js';
import RideComplete from './Components/RideComplete.js';

export function registerScreens() {
  console.log("Registering screens!");
  Navigation.registerComponent('rnswyssbike.AccountComponent', () => AccountComponent);
  Navigation.registerComponent('rnswyssbike.BookbikeComponent', () => BookbikeComponent);
  Navigation.registerComponent('rnswyssbike.FeedbackComponent', () => FeedbackComponent);
  Navigation.registerComponent('rnswyssbike.LoginComponent', () => LoginComponent);
  Navigation.registerComponent('rnswyssbike.MapComponents', () => MapComponents);
  Navigation.registerComponent('rnswyssbike.MarkersComponent', () => MarkersComponent);
  Navigation.registerComponent('rnswyssbike.SignupComponent', () => SignupComponent);
  Navigation.registerComponent('rnswyssbike.SuccessBookedBike', () => SuccessBookedBike);
  Navigation.registerComponent('rnswyssbike.EndBookedBike', () => EndBookedBike);
  Navigation.registerComponent('rnswyssbike.RideComplete', () => RideComplete);
}
