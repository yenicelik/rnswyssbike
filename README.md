## Swyssbike App for iOS and Android using the React-Native framework

#### Operate by:

```
npm start
react-native run-ios
```

or using the equivalent operation for android (`run-android`)

#### Following Protocols are used:

##### Screen Names
A screen is any javascript file that renders something onto the screen.
In the screens.js, all the screens are defined for the navigator, such that the navigator knows how to navigate to each screen.
The convention followed is that the screen name always equals:

`rnswyssbike.{Screen Component Name}`

##### Async Storage Protocols used
The following elements are saved in async storage:
All names are prepended by `@LocalStore`
- `@LocalStore:userToken`: Is the firebase-generated user-token which is retrieved through firebase when signed in or signed up, which can be safely used to *automatically* let the user login.
- `@LocalStore:userMail`: The user's email, which can be used to log in automatically.
- `@LocalStore:userPass`: DANGER: This is insecure, but a temporary solution to save the user's password such that he can automatically log in

#### Following frameworks have been used

- [Airbnb maps](https://github.com/airbnb/react-native-maps)
- [ScrollableTabView](https://github.com/skv-headless/react-native-scrollable-tab-view)
- --[tcomb-Form-Native](https://github.com/gcanti/tcomb-form-native)
- --[react-native-form](https://www.npmjs.com/package/react-native-form)
- [Gifted Form](https://github.com/FaridSafi/react-native-gifted-form)
- [React Native Forms](https://github.com/michaelhelvey/react-native-forms)
- [Simple native forms](npm install --save simple-react-form)
- [Simple Native material ui](npm install --save simple-react-form-material-ui)
- [React native form generator](npm install --save react-native-form-generator)
- [React native navigation](https://wix.github.io/react-native-navigation/)
- [React native navbar collapsible](https://github.com/caroaguilar/react-native-bar-collapsible)
- [Mobx form](https://github.com/foxhound87/mobx-react-form)
- [validatorjs]
- [Communications](https://github.com/anarchicknight/react-native-communications)
- [Timer](https://github.com/ocetnik/react-native-background-timer)
- [Crashlytics](https://www.fabric.io/onboard)
- [Spinkit](npm install react-native-spinkit@latest --save) 

This looks really cool! [Loading screens](https://github.com/maxs15/react-native-spinkit)
