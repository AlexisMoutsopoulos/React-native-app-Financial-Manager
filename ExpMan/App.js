
import React, { Component } from 'react';
//import react in our code.  
 
//For react-navigation 4.0+
import { createAppContainer } from 'react-navigation';
import { createStackNavigator,TransitionPresets } from 'react-navigation-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainPage from './MainPaig';
 
import Cale from './Calendarr';
import ExpForm1 from './ExpForm1';
import ExpForm2 from './ExpForm2';
import PiieChart from './PieChart'
import ModifyClass from './ModifyClass'
import Isologismos from './Isologismos'
import Settings from './Settings';
import StartPage from './StartPage';
import LogInPage from './LogInPage'
import { NavigationContainer } from '@react-navigation/native';
import { flipY, zoomIn,zoomOut, fadeIn } from 'react-navigation-transitions'
 

const App = createStackNavigator({
 
  //Constant which holds all the screens.
  //First entry by default be our first screen if we do not define initialRouteNamε
  MainPage: { screen: MainPage },  
  ExpForm1: { screen: ExpForm1 }, 
  ExpForm2: { screen: ExpForm2 },
  PiieChart: {screen: PiieChart},
  Cale : {screen: Cale},
  ModifyClass: {screen: ModifyClass},
  Isologismos: {screen: Isologismos},
  Settings: {screen: Settings},
  StartPage : {screen: StartPage},
  LogInPage: {screen: LogInPage}
  
},
{
  initialRouteName: 'StartPage',
  defaultNavigationOptions: {
    ...TransitionPresets.ScaleFromCenterAndroid,
    navigationOptions: {
      headerTintColor: 'blue',
    },
  }
}
);
export default createAppContainer(App);
 