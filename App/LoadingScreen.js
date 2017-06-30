/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  ListView
} from 'react-native';

import Spinner from 'react-native-spinkit';


const {
  width,
  height
} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1; //0.00322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class LoadingScreen extends Component {

  constructor(props) {
    super(props);
  }

  //HUD consists of Code, 'Stop riding' and Bike Number (Bike ID)
  render() {
    return (
      <View style={styles.background}>
        <Spinner isVisible={true} size={100} type={'9CubeGrid'} color={"#FFFFFF"}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(211, 84, 0, 1.0)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});

AppRegistry.registerComponent('LoadingScreen', () => LoadingScreen);
