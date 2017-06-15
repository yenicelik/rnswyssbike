import React, {Component} from 'react';
import {
  AppRegistry
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './App/screens.js';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'rnswyssbike.LoginComponent', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  }
})
