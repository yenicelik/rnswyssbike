import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  ListView,
  TextInput,
  Text,
  Switch,
  Slider,
  Picker
} from 'react-native';

import {startMainApp} from './../commons.js';

import { Container, Content, Form, Item, Input, Button } from 'native-base';

//Let this stay here for later (must see if native-base does good form-validation..)
// import { Form,
//   Separator,InputField, LinkField,
//   SwitchField, PickerField,DatePickerField,TimePickerField
// } from 'react-native-form-generator';

export default class SignupComponent extends Component {

  constructor(props) {
    super(props);
  }

  navigateToMap(){
    startMainApp();
  }

  render() {
    return (
      <Container>
                <Content>
                    <Form style={{alignItems:'center'}}>
                        <Item Left>
                            <Input placeholder="First Name" />
                        </Item>
                        <Item Right>
                            <Input placeholder="Last Name" />
                        </Item>
                        <Item>
                            <Input placeholder="Email" />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" />
                        </Item>
                        <Button block danger><Text>Sign up!</Text></Button>
                        <Button block warning><Text>Facebook Sign Up</Text></Button>
                        <Button block warning><Text>Google Plus Sign Up</Text></Button>
                        <Button block danger onPress={() => this.navigateToMap()}><Text>Go to map</Text></Button>
                    </Form>
                </Content>
            </Container>
    );
  }
}

AppRegistry.registerComponent('SignupComponent', () => SignupComponent);
