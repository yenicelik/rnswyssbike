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

import { Provider as MobXProvider, observer, inject, autorun } from 'mobx-react/native';

import { Navigation } from 'react-native-navigation';

import {Container, Content, Badge, Text, Card, CardItem, Button, Fab, Icon, Tab, Tabs} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import MapView from 'react-native-maps';
import MarkersComponent from '../MarkersComponent/MarkersComponent.js';
import FeedbackComponent from '../FeedbackComponent/FeedbackComponent.js';
import LoadingScreen from '../LoadingScreen.js';
import {getUserStore} from '../UserStore.js';
import {getMarkersStore} from '../MarkersComponent/MarkersStore.js';

const {
  width,
  height
} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1; //0.00322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@observer
export default class MapComponents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curTime: new Date().toLocaleString()
    }
    this.cityBorders= [{
      latitude:47.408370, //WEST HONGG
      longitude:8.500000
    },
    {
      latitude:47.413075, //NORTH HONGG
      longitude:8.510729
    },
    {
      latitude: 47.417436, //HONGG - OERLIKON
      longitude: 8.531859
    },
    {
      latitude: 47.419306, //NORTH OERLIKON
      longitude: 8.555247
    },
    {
      latitude:47.412727, //WEST OERLIKON
      longitude:8.559738
    },
    {
      latitude:47.374697, //EAST ETH
      longitude:8.557577
    },
    {
      latitude:47.374240, //HB
      longitude:8.533130
    }];
    this.userStore = getUserStore();
    this.markersStore = getMarkersStore();
    this.state = {
      curTime: new Date().toLocaleString(),
    }
  }

  /** NAVIGATORS */
  navigateToEndBookBike(){
    this.props.navigator.push({
      screen: "rnswyssbike.EndBookedBike",
    });
  }
  /*/ NAVIGATORS */

  componentDidMount() {
    this.userStore.getCurLocation();
    this.userStore.watchCurLocation();

    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    }, 59*1000) //Update every 40 seconds

  }

  componentWillUnmount() {
    this.userStore.clearWatch();
  }

  //HUD consists of Code, 'Stop riding' and Bike Number (Bike ID)
  render() {
      return (
        (this.markersStore.loadingMarkers) ? <LoadingScreen /> :
        <View style={styles.container}>
          <MapView
            showsMyLocationButton={true}
            style={styles.map}
            region={{
                latitude: this.userStore.usrLat, //this.state.usrLat,
                longitude: this.userStore.usrLng, //this.state.usrLng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
          >
          <MapView.Polygon
          coordinates={this.cityBorders}
          strokeColor="rgba(100, 200, 150, 0.5)"
          fillColor="rgba(100, 200, 150, 0.2)"
          >
          </MapView.Polygon>

            <MapView.Marker coordinate={{latitude: this.userStore.usrLat, longitude: this.userStore.usrLng}}>
              <View style={styles.radius}>
                <View style={styles.marker}></View>
              </View>
            </MapView.Marker>

          <MarkersComponent navigator={this.props.navigator}>
          </MarkersComponent>

          </MapView>

          {
            (this.userStore.bookedBikeNo != -1) && (this.userStore.bikeObj) ?
            <View style={{flex: 1, justifyContent: 'space-between', bottom: 0, position: 'absolute', width: '100%'}}>
              <Button disabled full style={{width: '100%', backgroundColor: '#039BE5'}}><Text>Bike ID: {String(this.userStore.bikeObj.bike_no)}</Text></Button>
              <Button disabled full style={{width: '100%', backgroundColor: '#039BE5'}}><Text>Unlock Code: {String(this.userStore.bikeObj.code)}</Text></Button>
              <Button disabled full style={{width: '100%', backgroundColor: '#03A9F4'}}><Text>Started at: {String(this.userStore.startTime)} min.</Text></Button>
              <Button full style={{width: '100%', backgroundColor: '#ff867c'}} onPress={() => this.navigateToEndBookBike()}><Text>Stop riding</Text></Button>
            </View> : null
          }
        </View>
      );
  }
}


const styles = StyleSheet.create({
  box1: {
   position: 'absolute',
   top: 40,
   left: 40,
   width: 100,
   height: 30,
   backgroundColor: 'rgba(36, 202, 255, 0.3)',
   borderRadius: 10
 },
  grid: {
    position: 'absolute'
  },
  hud: {
    position: 'absolute',
    height: 50
  },
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

AppRegistry.registerComponent('MapComponents', () => MapComponents);
