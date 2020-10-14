//Import libraries
import React, {Component} from 'react';
import {
  StyleSheet, 
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  ToastAndroid,
   ImageBackground, BackHandler
} from 'react-native';

import {NavigationEvents} from 'react-navigation';
import Operations from './ListOperations'
import { Avatar, Accessory } from 'react-native-elements';
import Spinner from 'react-native-spinkit'
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient

export default class StartPage extends Component {
    static navigationOptions = {  
        headerShown: false,
      };

  state= {
      types:  'Bounce',
      size: 100,
      color: "#FFFFFF",
      isVisible: true,
       lista : new Operations()
     
  }

  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    
    BackHandler.exitApp();
    return true;
  }
  refresh () {
  
    this.state.lista._retrieveData1()
    setTimeout( ()=>{this.nextLevel()},1500);
   
     
   
  }
  
nextLevel=()=>{
  
  const {navigate} = this.props.navigation;
  
  if(this.state.lista._personname != ''){
     
    navigate('MainPage')
  }else{
    
    navigate('LogInPage')
  }
}
  changeVisibility() {
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    

    return (
        
      <View style={styles.container}>
         <NavigationEvents onWillFocus={() => {this.refresh()}} />
         <LinearGradient
          colors={['#9cecfb', '#65c7f7', '#0052d4']}
          style={styles.theImage}
        >
        <Text style={styles.logo}>FINANCIAL MANAGER</Text>
        <Avatar rounded  containerStyle={{alignSelf:'center',top:50}} size= 'xlarge' source={require('./ic_launcher.png')}/>
        <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
        <Text  style={{top:'62%',position:'absolute',right:'35%'}}>Περιμενετε λιγο...</Text>
        </LinearGradient>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   
  logo:{
      fontSize:28,
      textAlign:'center',
      top: 35,
      fontFamily:'Cochin'
  },
  theImage:{
    width:'100%',
    height: '100%'
  },

  spinner: {
    position:'absolute',
    alignSelf:'center',
    top:'45%'
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});
