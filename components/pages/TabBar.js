import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import DetailsScreen from './DetailsScreen';
import ListScreen from './ListScreen';
import ReviewScreen from './ReviewScreen';
import SettingsScreen from './SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const ListStack = createStackNavigator({
  List: { screen: ListScreen },
  Details: { screen: DetailsScreen },
});

const CameraStack = createStackNavigator({
  Camera: { screen: CameraScreen },
  Details: { screen: DetailsScreen },
});

const ReviewStack = createStackNavigator({
  Review: { screen: ReviewScreen }, 
  Details: { screen: DetailsScreen }, 
}); 

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    List: { screen: ListStack },
    Camera: { screen: CameraStack }, 
    Review: { screen: ReviewStack }, 
    Settings: { screen: SettingsStack },   
  },
  {
    navigationOptions: ({ navigation }) => ({

      tabBarIcon: ({ focused, tintColor }) => {

        const { routeName } = navigation.state;
        var iconName;

        if (routeName === 'Home') {
          iconName = 'md-home';
        } else if (routeName === 'Camera') {
          iconName = 'ios-barcode';
        } else if (routeName === 'List') {
          iconName = 'md-search';
        } else if (routeName === 'Review') {
          iconName = 'ios-create';
        } else if (routeName === 'Settings') {
          iconName = 'md-information-circle';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);



