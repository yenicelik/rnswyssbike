import { Navigation } from 'react-native-navigation';

export function startMainApp() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Map',
        screen: 'rnswyssbike.MapComponents', //This is a registered name for a screen
        // icon:
        navigatorStyle: {
          navBarHidden: true,
        }
      },
      {
        label: 'Feedback',
        screen: 'rnswyssbike.FeedbackComponent',
        title: 'Feedback'
      },
      {
        label: 'Account',
        screen: 'rnswyssbike.AccountComponent',
        title: 'Account'
      }
    ],
  });
}
