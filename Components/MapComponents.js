/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';


const {
  width,
  height
} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1.;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class rnswyssbike extends Component {

  constructor(props) {
    super(props);

    this.state = {
      /* START OF GPS LOGIC */
      gpsPosition: {
        latitude: 0,
        longitude: 0
      },
      markers: [{
                title: "Bike1",
                description: "Bike1",
                latitude: 47.3673,
                longitude: 8.45
              },
              {
                title: "Bike2",
                description: "Bike2",
                latitude: 47.1673,
                longitude: 8.79
              },
              {
                title: "Bike3",
                description: "Bike3",
                latitude: 47.5673,
                longitude: 8.65
              }]
      /* END OF GPS LOGIC */
    }
  }


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
      console.log(lastRegion);
      this.setState({
        gpsPosition: lastRegion
      }, (error) => console.log(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      });

    });
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
          title={marker.title}
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
    borderRadius: 30/2,
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
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#rgba(255, 255, 255, 0.05)'
  },
  bikeRadius: {
    height: 30,
    width: 30,
    borderRadius: 30/2,
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
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#rgba(255, 255, 255, 0.05)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map:  {
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
