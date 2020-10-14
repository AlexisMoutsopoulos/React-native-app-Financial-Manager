import React, { Component } from 'react';
import {NavigationEvents} from 'react-navigation';
import { BackHandler } from 'react-native';
import {  StyleSheet,  Text,  View, ToastAndroid, ImageBackground, Image} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient'; 

/* 
 * Calender Screen
 */
export default class Cale extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Ημερολογιο',
    headerStyle:{ backgroundColor: '#2a9df4'},
    headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
    headerRight: () => <Image style= {styles.img}  source ={require('./images/calendar.png')}/>
  });

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      selectedStartDate: null,
      customDatesStyles: [],
      listCo : [],  
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() { 
    this.props.navigation.navigate('MainPage');
    return true;
  }

  iAmBack= () => {
    this.setState({listCo : this.props.navigation.getParam('List1', 'NO-ID')},this.setColors)
  }
  /*
   Set background for income and outcome
  */
 
  setColors=()=>{
    var tmp=[];
    this.state.listCo.map((element) => {
      var d = element._datee;
      if(element._type == 'ΕΣΟΔΟ'){
        tmp.push({ date: d,
          style: {backgroundColor: '#93E9BE'},
          textStyle: {color: 'black',fontWeight : 'bold'}, // sets the font color
        })
      }else{
        tmp.push({ date: d,
          style: {backgroundColor: 'orange'},
          textStyle: {color: 'black',fontWeight: 'bold'}, // sets the font color  
        })
      }
    
    });
    this.setState({customDatesStyles: [...this.state.customDatesStyles,   ...tmp]})
  }

  onDateChange(dat) {
    var date = new Date(dat)
    // If press an date with transaction a message appear
    this.state.listCo.map((element) => {
    var d = element._datee;
    if(d.getMonth()==date.getMonth() && d.getDate()==date.getDate()){ 
      switch(element._category) { 
        default:
          ToastAndroid.show(element._category+': ' + JSON.stringify(element._amount) + '‎€' + ' '+  element._description ,ToastAndroid.SHORT);
          break;
        case  'Αλλο':
          ToastAndroid.show('Αλλη κατηγορια: ' + JSON.stringify(element._amount)+ '‎€' + ' '+  element._description  ,ToastAndroid.SHORT);
          break;
        }
      return;
    }
    });
  }
 
  render() {
  
      return (
      <View style={styles.container}>
         {/*trigger when we return to the main page*/}
        <NavigationEvents onWillFocus={() => {this.iAmBack()}} />
    
        <ImageBackground style={styles.theImage} source ={require('./images/backk.jpg')}>
            <Text style ={styles.titleCal}>ΗΜΕΡΟΛΟΓΙΟ ΚΙΝΗΣΕΩΝ</Text>
            <LinearGradient
                colors={['#ff5f6d', '#ffc371']}
                style={{top:60,width:'100%',justifyContent:'center',alignItems:'center',height:'40%'}}
            >
        <CalendarPicker
          customDatesStyles = {this.state.customDatesStyles }
          onDateChange={ this.onDateChange}
          minDate = {new Date('2020','01','01')}
          style= {styles.calendar}
          textStyle = {{ fontFamily: 'cursive',
          color : 'midnightblue',fontWeight:'bold'}}
          onMonthChange= {this.onMonthChange}
          selectedDayColor= {'grey'}
        />
        </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',   
  },
  img:{
    width:30,
    height: 30,
    marginRight: 15,
    shadowRadius: 20,
    shadowOpacity:1, 
  }, 
  titleCal:{
    fontSize: 30,
    fontFamily: 'palatino',
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textShadowColor: 'grey',
    color: '#93E9BE',
    letterSpacing: 1,
  },
  theImage:{
    width: '100%',
    height : '100%',
  }
});