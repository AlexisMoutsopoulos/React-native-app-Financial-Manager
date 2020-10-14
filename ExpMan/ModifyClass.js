import React, { Component } from 'react';
 import {NavigationEvents} from 'react-navigation';
 import { BackHandler } from 'react-native';
 import AndroidDialogPicker from "react-native-android-dialog-picker";
 import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
 import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient

import {
  StyleSheet,
  Text,
  ScrollView,
 ToastAndroid,
 TouchableOpacity,
 SectionList,
 Image,
 View
} from 'react-native';
import Operations from './ListOperations';
import Money from './Money';
 
export default class ModifyClass extends Component {
    constructor(props){
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
    this.state={
      listCo: new Operations(),
      curList: [],
      prevMon: '',
      newMon: new Money()
 }
    }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Τροποποιηση',
    headerStyle:{ backgroundColor: '#838996'},
    headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
    headerRight: () => <Image style= {styles.img}  source ={require('./images/mod.png')}/>
  });

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
      var temp = this.props.navigation.getParam('Source', 'NO-ID')
      if(temp == 'exf2'){
        this.setState({newMon : this.props.navigation.getParam('Mon', 'NO-ID')},()=>{
        this.state.listCo.modifyVal(this.state.prevMon._id,this.state.newMon),
        this.state.listCo.refreshData(),
        setTimeout( ()=>{this.setState({curList: this.state.listCo._monList})},500)})
        
      temp='we'
      }else{
        this.setState({listCo : this.props.navigation.getParam('List1', 'NO-ID')},() => {
            this.setState({curList: this.state.listCo._monList})})
              
        this.props.navigation.setParams({'src': this.state.source})
        }
      }

       
      _pressText(val){
           // only for android
        AndroidDialogPicker.show(
            {
              title: "Ενεργεια", // title of the dialog
              items: ['Διαγραφη','Τροποποιηση'], // items/options to choose from
              cancelText: "Cancel" ,// cancel text (optional - cancel button won't be render if this is not passed)
              onCancel : {isVisible : false},
             
            },
           
            // only called when pressed on one of the items
            // won't be called if user pressed on cancel or dismissed the dialog
            buttonIndex => {
              if(buttonIndex==0){
                this.state.listCo.deleteFromList(val._id)
                setTimeout( ()=>{this.setState({curList: this.state.listCo._monList})},500);
              }else  if(buttonIndex==1){
                
                this.setState({prevMon: val}) 
                this.props.navigation.navigate('ExpForm2', {Mon: this.state.prevMon});
              }
            }
        )
      }

  render() {
    /////////////////////////////////
    var listsu=[]
    var listpsy =[]
    var listbuy =[]
    var listfu =[]
    var listho=[]
    var listco =[]
    var listeat =[]
    var listcar =[]
    var listdrink=[]
    var listbills =[]
    var listgamout =[]
    var listphone =[]
    var listkids=[]
    var listAni=[]

    ///////////////////////////////////////
    var listsa=[]
    var listtip =[]
    var listgift =[] 
    var listgamin = []
    var listothe =[]
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
     this.state.curList.map((el)=> {
      if(el._category=='Σουπερ Μαρκετ'){
        listsu.push(<View style={styles.erow}>
           <MaterialIconsIcon name="touch-app" style={styles.icon} />
        <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
          <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
          </TouchableOpacity>
          </View>)  
      }else if(el._category=='Αγορα'){
        listbuy.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      }  else if(el._category=='Καυσιμα'){
        listfu.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>)  
      }
      else if(el._category=='Αλλο'){
        listothe.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Καφες'){
        listco.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Ποτο'){
        listdrink.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Φαγητο'){
        listeat.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Σπιτι'){
        listho.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Τηλεφωνο'){
        listphone.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Παιδια'){
        listkids.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Αυτοκινητο'){
        listcar.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Τζογος'){
        listgamout.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Λογαριασμοι'){
        listbills.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } else if(el._category=='Κατοικιδια'){
        listAni.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      } 
      /////////////////////////////////////////////////////////////////////////
      else if(el._category=='Μισθος'){
        listsa.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth()   +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>)  
      }else if(el._category=='Χαρτζιλικι'){
        listtip.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth()  +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      }if(el._category=='Δωρο'){
        listgift.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>)  
      }else if(el._category=='Ψυχαγωγια'){
        listpsy.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      }else if(el._category=='Τζογος :)'){
        listgamin.push(<View style={styles.erow}>
          <MaterialIconsIcon name="touch-app" style={styles.icon} />
       <TouchableOpacity onLongPress= {this._pressText.bind(this,el)}>
         <Text> Ποσο : {el._amount} € Ημερομηνια: {JSON.stringify(el._datee.getDate())}/ {JSON.stringify(el._datee.getMonth() +1)}/ {JSON.stringify(el._datee.getYear()-100)}</Text>
         </TouchableOpacity>
         </View>) 
      }
    });
    
      return (
       
         
    <ScrollView style={styles.container}>
      {/*trigger when we return to the main page*/}
    <NavigationEvents onWillFocus={() => {this.iAmBack()}} />
    {/*////////////////////////////////////////////*/}
    <LinearGradient
          colors={['#abbaab','#ffffff' ]}
          style={{height:'100%',width:'100%'}}
        >
    <View style={styles.exrow}>
    <MaterialIconsIcon name="money-off" style={styles.icon} />
    <Text style ={styles.esoda}>ΕΞΟΔΑ</Text>
    </View>

   <Text style ={styles.cat}>Σουπερ Μαρκετ</Text>
   {listsu}
   <Text style ={styles.cat}>Καυσιμα</Text>
   {listfu}
   <Text style ={styles.cat}>Αγορες</Text>
   {listbuy}
   <Text style ={styles.cat}>Ψυχαγωγια</Text>
   {listpsy}
   <Text style ={styles.cat}>Καφεδες</Text>
   {listco}
   <Text style ={styles.cat}>Ποτα</Text>
   {listdrink}
   <Text style ={styles.cat}>Φαγητο</Text>
   {listeat}
   <Text style ={styles.cat}>Παιδια</Text>
   {listkids}
   <Text style ={styles.cat}>Λογαριασμοι</Text>
   {listbills}
   <Text style ={styles.cat}>Σπιτι</Text>
   {listho}
   <Text style ={styles.cat}>Τηλεφωνο</Text>
   {listphone}
   <Text style ={styles.cat}>Αυτοκινητο</Text>
   {listcar}
   <Text style ={styles.cat}>Τζογος</Text>
   {listgamout}
   <Text style ={styles.cat}>Κατοικιδια</Text>
   {listAni}

   <View style={styles.esrow}>
   <MaterialIconsIcon name="attach-money" style={styles.icon} />
   <Text style ={styles.esoda}>ΕΣΟΔΑ</Text>
   </View>

   <Text style ={styles.cat1}>Μισθοι</Text>
   {listsa}
   <Text style ={styles.cat1}>Χαρτζιλικια</Text>
   {listtip}
   <Text style ={styles.cat1}>Δωρα</Text>
   {listgift}
   <Text style ={styles.cat1}>Τζογος :)</Text>
   {listgamin}
   <Text style ={styles.cat3}>ΛΟΙΠΑ ΕΞΟΔΑ - ΕΣΟΔΑ</Text>
   {listothe}
   </LinearGradient>
  </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff'
  },
  exrow:{
    flexDirection: 'row',
    alignItems: 'center',
    left: '10%'
  },
  esrow:{
    flexDirection: 'row',
    alignItems: 'center',
    left: '10%'
  },
  erow:{
    flexDirection: 'row',
     
  },
  icon:{
    fontSize: 30
  },
  esoda:{
    padding:10,
    fontSize: 25,
    
    fontWeight: 'bold'
  },
  cat:{
    fontSize:19,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    paddingLeft: 16,
    color: 'red'
  },
  cat1:{
    fontSize:19,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    paddingLeft: 16,
    color: 'green'
  },
  cat3:{
    fontSize:19,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    paddingLeft: 16,
    color: 'grey',
    paddingTop:30
  },
  img:{
    width:40,
    height: 40,
    marginRight: 15,
    shadowColor: 'red',
    shadowOffset:{width:10,height:10},
    shadowRadius: 20,
    shadowOpacity:1,
    
  }, 
});