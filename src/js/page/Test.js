import { View, Text } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import React, { Component } from 'react';

 class FeedScreen extends Component {

  render() {
    return (
      <View>
        <Text> textInComponent FeedScreen</Text>
      </View>
    );
  }
}
class ProfileScreen extends Component {
  
    render() {
      return (
        <View>
          <Text> textInComponent ProfileScreen</Text>
        </View>
      );
    }
  }
  class DetailsScreen extends Component {
  
    render() {
      return (
        <View>
          <Text> textInComponent DetailsScreen</Text>
        </View>
      );
    }
  }
  class AuthScreen extends Component {
  
    render() {
      return (
        <View>
          <Text> textInComponent AuthScreen</Text>
        </View>
      );
    }
  }

const FeedStack = createStackNavigator({
    FeedHome: FeedScreen,
    /* any other route you want to render under the tab bar */
  });
  
  const TabNavigator = createBottomTabNavigator({
    Feed: FeedStack,
    Profile: ProfileScreen,
  });
  
  const HomeStack = createStackNavigator({
    Tabs: TabNavigator,
    Details: DetailsScreen,
    /* any other route you want to render above the tab bar */
  });
  
  const AppNavigator = createStackNavigator({
    Auth: AuthScreen,
    Home: HomeStack,
  });

  export default createAppContainer(AppNavigator);