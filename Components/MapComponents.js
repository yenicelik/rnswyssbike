/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// const AppRegistry = require('AppRegistry');
// const Component = require('Component');
// const Dimensions = require('Dimensions');
// const MapView = require('MapView');
// const React = require('React');
// const StyleSheet = require('StyleSheet');
// const View = require('View.react');
//
// const firebase = require('firebase');
// const navigator = require('navigator');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ListView
} from 'react-native';

import MapView from 'react-native-maps';

//TODO: move the firebase logic into the initialization of the app
import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChC62HAtPWAtFiJmcDlTGWwq_YFOjSNqE",
  authDomain: "protobike-1495735501799.firebaseapp.com",
  databaseURL: "https://protobike-1495735501799.firebaseio.com",
  storageBucket: "protobike-1495735501799.appspot.com",
  messagingSenderId: "777348050122"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const {
  width,
  height
} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.7;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class rnswyssbike extends Component {

  constructor(props) {
    super(props);

    this.bikesRef = firebaseApp.database().ref().child('/bikes/');

    this.state = {
      gpsPosition: {
        latitude: 0,
        longitude: 0
      },
      markers: [],
    }
  }

  /* START OF FIREBASE LOGIC */
  listenForBikes(bikesRef) {
    console.log("In listenForBikes");
    bikesRef.on('value', (snap) => {
      console.log("Oh snap!");
      //get children as an array
      var localMarkers = [];
      snap.forEach((child) => {
        console.log("Bike no is: ");
        console.log(child.val().bike_no);
        localMarkers.push({
          title: child.val().bike_no, // child.val().bike_no,
          description: "Bike2",
          current_user: child.val().current_user,
          latitude: parseFloat(child.val().positionLat),
          longitude: parseFloat(child.val().positionLng),
          _key: child.key
        });
      });

      console.log("The full list is now: ");
      console.log(JSON.stringify(localMarkers));
      this.setState({
        markers: localMarkers //marthis.state.markers.cloneWithRows(markers)
      });
    })
  }

  _renderItem(marker) {
    console.log(marker);
    return (
      <MapView.Marker
      coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
      title={marker.description}
      description={marker.description}>
      <View style={styles.bikeRadius}>
             <View style={styles.bikeMarker}></View>
      </View>
      </MapView.Marker>
    );
  }
  /* END OF FIREBASE LOGI */


  /* START OF GPS LOGIC */
  watchID: ? number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
      var initialRegion = {
        latitude: lat,
        longitude: lng
      };
      this.setState({
        gpsPosition: initialRegion
      });

    }, (error) => alert(JSON.stringify(error)), {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000
    });

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
      var lastRegion = {
        latitude: lat,
        longitude: lng
      };
      this.setState({
        gpsPosition: lastRegion
      }, (error) => console.log(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      });
    });

    /* START SUB FIREBASE LOGIC */
    this.listenForBikes(this.bikesRef);
    /* END SUB FIREBASE LOGIC */

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  /* END OF GPS LOGIC */ //TODO: Figure out how to move this into a separate component

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
              latitude: this.state.gpsPosition.latitude,
              longitude: this.state.gpsPosition.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
        >

        {this.state.markers.map( (marker, index) => {
          console.log(JSON.stringify(marker));
          return (
          <MapView.Marker
          key={index}
          coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
          title={marker.description}
          description={marker.description}
          >
          <View style={styles.bikeRadius}>
            <View style={styles.bikeMarker}></View>
          </View>
          </MapView.Marker>
        );
        })}
          <MapView.Marker coordinate={{latitude: this.state.gpsPosition.latitude, longitude: this.state.gpsPosition.longitude}}>
            <View style={styles.radius}>
              <View style={styles.marker}></View>
            </View>
          </MapView.Marker>

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
    borderWidth: 4,
    borderColor: 'rgba(0, 122, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#rgba(255, 255, 255, 0.05)'
  },
  bikeRadius: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 122, 0, 0.5)',
    borderWidth: 4,
    borderColor: 'rgba(255, 122, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bikeMarker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#rgba(255, 255, 255, 0.05)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rnswyssbike', () => rnswyssbike);
