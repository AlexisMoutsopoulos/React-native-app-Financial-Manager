import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Animated,ToastAndroid,Image } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Operations from './ListOperations';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

import LinearGradient from 'react-native-linear-gradient';
import { ListItem, Icon } from 'react-native-elements'
import {NavigationEvents} from 'react-navigation';
import { BackHandler } from 'react-native';


export default class Isologismos extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Ισοζυγιο',
    headerStyle:{ backgroundColor: '#838996'},
    headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
    headerRight: () => <Image style= {styles.img}  source ={require('./images/bala.png')}/>
  });
  constructor(props){
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.Animation = new Animated.Value(0);
}
state={
  radio_props : [
    {label: 'Σημερα ', value: 0 },
    {label: 'Για τον Μηνα ', value: 11 },
    {label: 'Για την βδομαδα   ', value: 22}
  ] ,
  listCo: new Operations(),
 
 
  posostoin:0,
  
  sumIn:0,
  sumOut:0,
}



StartBackgroundColorAnimation = () =>
    {
        this.Animation.setValue(0);

        Animated.timing(
            this.Animation,
            {
                toValue: 1,
                duration: 3000
            }
        ).start( (o) => {
          if(o.finished) {
            this.StartBackgroundColorAnimation();
          }
        });
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
   
    /////////////////////////////////////////////////////////////////////////////
    this.setState({listCo : this.props.navigation.getParam('List1', 'NO-ID')})
         
}

takePososto(){
  this.setState({posostoin: 0})
    
    this.setState({sumIn:0})
    this.setState({sumOut: 0})
    ////////////////////////////////////////////////////////////////////////////////////
  if(this.state.value == 11){
    if(this.state.listCo.takeIncomeCurMonth() !=0){
       this.setState({posostoin:  Number(((this.state.listCo.takeIncomeCurMonth() - this.state.listCo.takeExpenseCurMonth()) /this.state.listCo.takeIncomeCurMonth())*100).toFixed(1)})
    }         
    this.setState({sumIn: this.state.listCo.takeIncomeCurMonth()})
    this.setState({sumOut: this.state.listCo.takeExpenseCurMonth()})
  }else if(this.state.value == 0 ){
    if(  this.state.listCo.takeIncomeToday()!=0 ){
      this.setState({posostoin:  Number(((this.state.listCo.takeIncomeToday() - this.state.listCo.takeExpenseToday()) /this.state.listCo.takeIncomeToday())*100).toFixed(1)})
    }
    this.setState({sumIn: this.state.listCo.takeIncomeToday()})
     this.setState({sumOut: this.state.listCo.takeExpenseToday()})
  }else if(this.state.value==22   ){
    if(this.state.listCo.takeIncomeWeek() !=0){
      this.setState({posostoin:  Number(((this.state.listCo.takeIncomeWeek() - this.state.listCo.takeOutcomeWeek()) /this.state.listCo.takeIncomeWeek())*100).toFixed(1)})
    }
    
    this.setState({sumIn: this.state.listCo.takeIncomeWeek()})
    this.setState({sumOut: this.state.listCo.takeOutcomeWeek()})
  }
    
  }
   

  
  render(){
    
  var listOfOut = []
    
    var listOfIn = []
    ////////////////////////////////////////////////////////////////////////////////////
    if(this.state.value == 11){
      listOfIn = []
    this.state.listCo.takeListOfIncomeMonth().map((el)=>{
    listOfIn.push({title: el})});
    listOfOut = []
    this.state.listCo.takeListOfOutcomeMonth().map((el)=>{
      listOfOut.push({title: el})

    });
  
  }else if(this.state.value == 0){
    listOfIn = []
    this.state.listCo.takeListOfIncomeDay().map((el)=>{
      listOfIn.push({title: el})});
      listOfOut = []
      this.state.listCo.takeListOfOutcomeDay().map((el)=>{
        listOfOut.push({title: el})
  
      });
  }else if(this.state.value==22){
    listOfIn = []
    this.state.listCo.takeListOfIncomeWeek().map((el)=>{
      listOfIn.push({title: el})});
      listOfOut = []
      this.state.listCo.takeListOfOutcomeWeek().map((el)=>{
        listOfOut.push({title: el})
  
      });
  }
  const BackgroundColorConfig = this.Animation.interpolate(
    {
        inputRange: [ 0, 0.2, 0.4, 0.6, 0.8, 1 ],
        
        outputRange: [ '#90d5b3', '#9cdabb', '#b5e3cc', '#a8dec4', '#9cdabb', '#90d5b3' ]

    });
 const width = ''+Number(this.state.posostoin).toFixed(2) +'%';
  return (
    <View style={styles.container}>
       {/*trigger when we return to the main page*/}
    <NavigationEvents onWillFocus={() => {this.iAmBack()}} />
    {/*////////////////////////////////////////////*/}


    <LinearGradient
          colors={['#ffffff','#abbaab' ]}
          style={styles.linearGradient}
        >
      <View style={styles.group2}>
        <Text style={styles.esoda}>ΕΣΟΔΑ</Text>
        <Text style={styles.exoda}>ΕΞΟΔΑ</Text>
      </View>

      <View style={styles.scrollAreaRow}>
        <View style={styles.scrollArea}>
          <ScrollView>
            {listOfIn.map((item, i) => (
      <ListItem
        key={i}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: ['#93E9BE', '#def8eb'],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        ViewComponent={LinearGradient}
        title={item.title._amount +'€'}
        subtitle={JSON.stringify(item.title._datee.getDate()) + '/' + JSON.stringify(item.title._datee.getMonth()+1)+ '/20' + JSON.stringify(item.title._datee.getYear()-100) + "\n"+ '('+item.title._category +')'}
        leftAvatar={{ rounded: true, title:"ΕΣ", backgroundColor: 'lightgrey'  }}
        style={{width: 420,height: 100,padding:10}}   
        bottomDivider
        chevron
      />))}
          </ScrollView>
          <Text style={styles.sum}>Συνολο: {this.state.sumIn}€</Text>
        </View>
        <View style={styles.scrollArea1}>
          <ScrollView >
          {listOfOut.map((item, i) => (
      <ListItem
        key={i}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: ['#ffa500', '#ffd27f'],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        ViewComponent={LinearGradient}
        title={item.title._amount +'€'}
        subtitle={JSON.stringify(item.title._datee.getDate()) + '/' + JSON.stringify(item.title._datee.getMonth()+1)+ '/20' + JSON.stringify(item.title._datee.getYear()-100) + "\n"+ '('+item.title._category +')'}
        leftAvatar={{ rounded: true, title: 'ΕΞ', backgroundColor: 'lightgrey' }}
        style={{width: 420,height: 100,padding:10}}   
        bottomDivider
        chevron
      />))}
            </ScrollView>
            <Text style={styles.sum}>Συνολο: {this.state.sumOut}€</Text>
        </View>
      </View>
      
      <View style={styles.posostaRow}>
        <Text style={styles.esodopososto}>Εσοδα: {this.state.sumIn-this.state.sumOut} €</Text>
        
      </View>
      
      <View style={styles.bar}>
        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: BackgroundColorConfig , width }}/>
        </View>






      <Text style={styles.txt}>Επελεξε περιοδο : </Text>
      <View style={styles.group}>
        <View style={styles.materialRadioRow}>
        <RadioForm
          radio_props={this.state.radio_props}
          initial={0}
          onPress={(val) => {this.setState({value:val},()=>{this.takePososto(),this.StartBackgroundColorAnimation()})}}
          formHorizontal={true}
          labelHorizontal={true}
          animation={true}
          buttonColor='black'
          selectedButtonColor='black'
        />
         
        </View>
        
        
      </View>
      </LinearGradient>
    </View>
  );
}
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  bar:{
    marginTop: 10,
    flexDirection: 'row',
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 1
  },
  sum:{
    fontFamily: 'abril-fatface-regular',
    fontSize: 20
  },
  txt:{
    position:'absolute',
    top:15,
    fontSize:20,
    left: 10,
    fontFamily: "abril-fatface-regular",
  },
  group2: {
    width: 326,
    height: 36,
    flexDirection: "row",
    marginTop: 169,
    marginLeft: 20,
   
  },
  linearGradient: {
    position:'absolute',
    width:'100%',
    height:'100%'
  },
  esoda: {
    fontFamily: "times-new-roman-regular",
    color: "rgba(30,210,28,1)",
    fontSize: 31,
    left:10,
    position:'absolute',
    top:30
  },
  exoda: {
    fontFamily: "times-new-roman-regular",
    color: "rgba(234,23,23,1)",
    fontSize: 31,
    right: 10,
    position:'absolute',
    top:30
  },
  scrollArea: {
    width: 181,
    height: 377,
    position:'absolute',
    top:50,
    left:1
  },
  scrollArea1: {
    width: 200,
    height: 377,
    position:'absolute',
    top:50,
    right:2,
  },
  scrollAreaRow: {
    height: 377,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 8,
    marginRight: 9
  },
  esodopososto: {
    fontFamily: "abril-fatface-regular",
     
    fontSize: 22
  },
  posostaRow: {
    height: 29,
    flexDirection: "row",
    marginTop: -491,
    marginLeft: 35,
    marginRight: 39
  },
  group: {
    width: 341,
    height: 36,
    flexDirection: "row",
    marginTop: -118,
    marginLeft: 9
  },
  img:{
    width:50,
    height: 40,
    marginRight: 15,
    shadowColor: 'red',
    shadowOffset:{width:10,height:10},
    shadowRadius: 20,
    shadowOpacity:1,
    
  }, 
});

 
