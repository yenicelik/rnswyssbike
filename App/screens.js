import { Navigation } from 'react-native-naviation';

//import all the pages

import { Navigation } from 'react-native-navigation';

import AccountComponent from './AccountComponent/AccountComponent.js';
import LoginComponent from './AccountComponent/LoginComponent.js';
import SignupComponent from './AccountComponent/SignupComponent.js';

import BookbikeComponent from './BookbikeComponent/BookbikeComponent.js';
import SuccessBookedBike from './BookbikeComponent/SuccessBookedBike.js';

import FeedbackComponent from './FeedbackComponent/FeedbackComponent.js';

import MapComponents from './MapComponents/MapComponents.js';
import MarkersComponent from './MarkersComponent/MarkersComponent.js';

import EndBookedBike from './EndBookedBikeComponent/EndBookedBike.js';
import RideComplete from './EndBookedBikeComponent/RideComplete.js';

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