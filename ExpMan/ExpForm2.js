import React, { Component } from "react";
import DatePicker from 'react-native-datepicker'
import { StyleSheet, View, Image,ImageBackground, Text,TextInput,ToastAndroid,TouchableOpacity,Button} from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from 'react-native-linear-gradient'; 
import AndroidDialogPicker from "react-native-android-dialog-picker";
import Money from './Money'
import SwitchSelector from "react-native-switch-selector";
import {NavigationEvents} from 'react-navigation';

/*
 * Modify a transaction from Modify screen
 */

export default class ExpForm2 extends Component {
  static navigationOptions = {  
    headerShown: false,
  };
  constructor(props){
    super(props);
  }
   state={
      
    arrayIn: ['Χαρτζιλικι','Μισθος','Δωρο','Τζογος :)','Αλλο'],
    arrayOut: ['Καφες','Ποτο','Κατοικιδια','Αγορα','Καυσιμα','Σουπερ Μαρκετ','Φαγητο','Λογαριασμοι','Παιδια','Τζογος','Ψυχαγωγια','Τηλεφωνο','Σπιτι','Αυτοκινητο','Αλλο'],
     isDialogVisi: false,
     expDate: new Date(),
     amount: 0.0,
     cat:'',
     pressedCat: 'ΠΙΕΣΕ',
     type:'',
     source : 'ExpForm',
     switchValue: 0,
     description: '',
     mon: new Money()
     
   }
  
   showPicker = () => {
    var items =[];
    if(this.state.type=="ΕΣΟΔΟ"){
     items = this.state.arrayIn;
       }else{
         items =this.state.arrayOut;
       }
      // only for android
      AndroidDialogPicker.show(
        {
          title: "Κατηγορια", // title of the dialog
          items: items, // items/options to choose from
          cancelText: "Cancel" ,// cancel text (optional - cancel button won't be render if this is not passed)
          onCancel : {isVisible : false},
         
        },
       
        // only called when pressed on one of the items
        // won't be called if user pressed on cancel or dismissed the dialog
        buttonIndex => {
          if(this.state.type =='ΕΣΟΔΟ'){
            this.setState({pressedCat: this.state.arrayIn[buttonIndex]})
            this.setState({cat :  this.state.arrayIn[buttonIndex]})
             
          }else{
            this.setState({pressedCat: this.state.arrayOut[buttonIndex]})
            this.setState({cat: this.state.arrayOut[buttonIndex]})
           
          }
          
        }
      );
      
       
    
  };
      
    handleInput = (val) => { 
     if(isNaN(val)){
       // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
       ToastAndroid.show("Value is Not Number",ToastAndroid.SHORT);
     }
     else{
       var value = parseFloat(val);  
       this.setState({amount: value});  
     }          
    };
    
    finishThis = () => {
      if(this.state.amount!=0.0 && this.state.type !='' && this.state.cat!='' && this.state.expDate != null  ){
      var money = new Money(this.state.amount,this.state.type,this.state.cat, new Date(this.state.expDate),this.state.description);
      this.props.navigation.navigate('ModifyClass', {Mon: money,Source:'exf2'});
      }
    }

    handlePress = (val) =>{
     
      
      this.setState({type: val});
      this.setState({pressedCat: 'ΠΙΕΣΕ'})
      this.setState({cat: ''})
    
}


   handleDesc= (val)=>{
     this.setState({description: val})  
   }

   iAmBack= () => {
    this.setState({mon : this.props.navigation.getParam('Mon', 'NO-ID')},()=>{
    this.setState({expDate: this.state.mon._datee}),
    this.setState({amount: this.state.mon._amount}),
    this.setState({type: this.state.mon._type}),
    this.setState({cat: this.state.mon._category}),
    this.setState({description: this.state.mon._description})})
  }
  

     render() {
      var incomeimg = require('./images/ExpForm1/income.png');
      var outcomeimg = require('./images/ExpForm1/outcome.png');
      var moneyimg = require('./images/ExpForm1/money.png');
      var catimg = require('./images/ExpForm1/cat.png');
     
       
  return (
    <View style={styles.container}>
        {/*trigger when we return to the main page*/}
    <NavigationEvents onWillFocus={() => {this.iAmBack()}} />
    {/*////////////////////////////////////////////*/}
    <LinearGradient
          colors={['#c0392b', '#8e44ad']}
          style={styles.theImage}
        >
    <View style={styles.group}>
          <SwitchSelector
              initial={this.state.switchValue}
              onPress={value => this.handlePress(value)}
              textColor={'blue'} //'#7a44cf'
              selectedColor={'white'}
              buttonColor={'blue'}
              borderColor={'black'}
              backgroundColor={'transparent'}
              hasPadding
              style={styles.cuSwitch}
              options={[
                { label: "Εσοδο", value: "ΕΣΟΔΟ", imageIcon: incomeimg},
                { label: "Εξοδο", value: "ΕΞΟΔΟ", imageIcon: outcomeimg}
                
  ]}
              textStyle={{fontFamily:'abril-fatface-regular'}
  }/>
         
        
         
       

      
      <View style={styles.choseDateRow}>
        <Text style={styles.chDttxt}>Επελεξε Ημερομηνια</Text>
        <View style={styles.dat1}>
        <DatePicker
          style={{width: 200}}
          date={this.state.expDate}
          mode="date"
          format="YYYY-MM-DD"
          minDate="2019-01-01"
          maxDate="2030-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({expDate: date})}}
      />
      </View>
      </View>


      <View style={styles.amountRow}>
        <Text style={styles.amountTxt}>Συμπληρωσε το Ποσο</Text>
        <TextInput  placeholder="1870.6" keyboardType={'number-pad'} defaultValue={JSON.stringify(this.state.amount)} onChangeText={this.handleInput}   style={styles.amountSty}  />
        <Image style={styles.icon4} source={moneyimg}></Image>
      </View>

      
      <View style={styles.catRow}>
        <Text style={styles.catTxt}>Κατηγορια</Text>
        <TouchableOpacity style={styles.but}  onPress={this.showPicker}>
          <Text style={styles.caption}>{this.state.pressedCat}</Text>
        </TouchableOpacity>  
        <Image style={styles.icon6} source={catimg}></Image>
      </View>


      <View style={styles.descRow}>
        <Text style={styles.desc}>Περιγραφη</Text>
        <TextInput placeholder="Σχολια..." style={styles.amountSty} defaultValue={this.state.description} onChangeText={this.handleDesc}/> 
        <MaterialIconsIcon name="description" style={styles.icon5} />
      </View>
      </View>

      <Text style={styles.title}>ΠΡΟΣΘΗΚΗ ΣΥΝΑΛΛΑΓΗΣ</Text>
      <View  style={styles.done}>
        <Button color= {"rgba(235,189,245,1)"}  title='ΤΕΛΟΣ' onPress={this.finishThis} />
      </View>
      </LinearGradient>
    </View>

    
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center'
  },
  caption: {
    color: "white",
    fontSize: 14,
    textAlign:'center'
  },
  done:{
    position:'absolute',
    alignSelf:'center',
    bottom: "10%",
    
    
   },
   theImage:{
    width: '100%',
    height : '100%'
  },
  group: {
    position:'absolute',
    
    top: 60,
    left:60,
    alignItems:'center'
    
  },
  icon: {
    position:'absolute',
    left: 10,
    color: "green",
    fontSize: 25,
    marginTop: 3
  },
  cuSwitch: { 
    width: 250,
    height: 28,
   
  },
  icon2: { 
    position:'absolute',
    left: 10,
    color: "green",
    fontSize: 25,
    marginTop: 3
    
  },
  chDttxt: {
    fontFamily: "roboto-700italic",
    color: "#121212",
    width: 125,
    height: 40,
    textAlign: "left",
    marginTop: 6
  },
  icon3: {
    color: "rgba(7,7,7,1)",
    fontSize: 30,
    width: 30,
    height: 30,
    marginTop: 10
  },
  choseDateRow: {
    position:'absolute',
    height: 46,
    flexDirection: "row",
    top: 100,
   
  },
  amountTxt: {
    fontFamily: "roboto-700italic",
    color: "#121212",
    width: 106,
    height: 34,
    marginTop: 5,
    left :-22
  },
 
  amountSty: {
    color: "#000", 
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",  
    width: 160,
    marginLeft: 22,
    left:20
    
  },
  icon4: {
    position:'absolute',
    left :100,
    width: 32,
    height: 30,
    marginLeft: 2,
    marginTop: 7
  },
  amountRow: {
    position: 'absolute',
    height: 39,
    flexDirection: "row",
    top: 180, 
  },
  catTxt: {
    fontFamily: "roboto-700italic",
    color: "#121212",
    width: 106,
    height: 34,
    left: -22
  },
  but: {
    height: 27,
    width: 120,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.46,
    shadowRadius: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "blue",
    marginLeft: 58,
    
  },
  icon6: {
    width: 30,
    height: 33,
    position:'absolute',
    left: 100
  },
  catRow: {
    position: 'absolute',
    height: 39,
    flexDirection: "row",
    top: 270,
    marginLeft: 18,
    marginRight: 11
  },
  desc: {
    fontFamily: "roboto-700italic",
    color: "#121212",
    width: 106,
    height: 34,
    marginTop: 15,
    left: -22
  },
  
  icon5: {
    color: "grey",
    fontSize: 30,
    width: 30,
    height: 30,
    marginLeft: 1,
    marginTop: 11,
    position:'absolute',
    left: 100
  },
  descRow: {
    height: 49,
    flexDirection: "row",
    position:'absolute',
    top: 340,
  },
  title: {
    textShadowColor: 'grey', 
    textShadowOffset: { width: 2.5, height: 2.5 }, 
    textShadowRadius: 1,
    position:'absolute',
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 26,
    top:  0,
    left:40,
    textAlign: "center",
    fontWeight: 'bold'
  }
});

 