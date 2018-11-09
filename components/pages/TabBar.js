import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import DetailsScreen from './DetailsScreen';
import CameraScreen from './CameraScreen'; 
import AddNewScreen from './AddNewScreen';
import SettingsScreen from './SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const CameraStack = createStackNavigator({
  Camera: { screen: CameraScreen },
  Details: { screen: DetailsScreen },
});

const AddNewStack = createStackNavigator({
  AddNew: { screen: AddNewScreen }, 
  Details: { screen: DetailsScreen }, 
}); 

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Camera: { screen: CameraStack }, 
    AddNew: { screen: AddNewStack }, 
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
          iconName = 'md-information-circle';
        } else if (routeName === 'AddNew') {
          iconName = 'md-information-circle';
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



