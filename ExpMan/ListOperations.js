const { default: Money } = require("./Money");
import {StyleSheet, View,ToastAndroid, Text,TouchableOpacity, Keyboard} from 'react-native';
import { AsyncStorage } from "react-native";
import { withNavigation } from 'react-navigation';
class Operations{

    

constructor(){
        this._monList =[];
        // Type 3: Persistent datastore with automatic loading
        var Datastore = require('react-native-local-mongodb');
       this.db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
        // You can issue commands right away
        this._personname='';
        this._persongoal=0;
        this._persontime='';
}

savePersonalData1 = async (name) =>{
         // create a function that saves your data asyncronously
        try {
            await AsyncStorage.setItem('name', name);
        } catch (error) {
            // Error saving data
        }
    
}

savePersonalData2 = async (goal) =>{
        // create a function that saves your data asyncronously
       try {
           await AsyncStorage.setItem('goal', goal);
       } catch (error) {
           // Error saving data
       }
   
}

savePersonalData3 = async (time) =>{
    // create a function that saves your data asyncronously
   try {
       await AsyncStorage.setItem('time', time);
   } catch (error) {
       // Error saving data
   }

}

     // fetch the data back asyncronously
_retrieveData1 = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                // Our data is fetched successfully
                this._personname = value;
               
            }
        } catch (error) {
            // Error retrieving data
        }
}

     // fetch the data back asyncronously
_retrieveData2 = async () => {
        try {
            const value = await AsyncStorage.getItem('goal');
            if (value !== null) {
                // Our data is fetched successfully
                this._persongoal=value;
            }
        } catch (error) {
            // Error retrieving data
        }
}

     // fetch the data back asyncronously
_retrieveData3 = async () => {
        try {
            const value = await AsyncStorage.getItem('time');
            if (value !== null) {
                // Our data is fetched successfully
               this._persontime= value
               
            }
        } catch (error) {
            // Error retrieving data
        }
}
      
saveToList(element){
        
        this.db.insert(element);
        
}

    
findInDBElement= (val) =>{
        this.db.findOne({ _id: val }, function (err, doc) {
            return doc;
          });
}

refreshData =    () =>{
            // Find all documents in the collection
     
        this.db.find({}).sort({_datee:1}).exec((err, docs) => {
             this._monList= [...docs];
             
           });
         
}

takeIncomeCurMonth(){
        var sum=0;
        var currentDate = new Date();
        this._monList.forEach(element =>{
            if(element._type == "ΕΣΟΔΟ" && element._datee.getMonth() == currentDate.getMonth() && element._datee.getYear() == currentDate.getYear()){
                
                sum+=element._amount }});
                
        return sum;
}
 
takeSumCatIn(val){
        var sum=0;
        var currentDate = new Date();
        this._monList.forEach(element =>{
            if(element._type == "ΕΣΟΔΟ" && element._datee.getMonth() == currentDate.getMonth() && element._datee.getYear() == currentDate.getYear() &&element._category == val){
               
                sum+=element._amount }});
                
        return sum;
}
 
takeSumCatOut(val){
        var sum=0;
        var currentDate = new Date();
        this._monList.forEach(element =>{
            if(element._type == "ΕΞΟΔΟ" && element._datee.getMonth() == currentDate.getMonth()  && element._datee.getYear() == currentDate.getYear() && element._category == val){
               
                sum+=element._amount }});
                
        return sum;
}

takeExpenseCurMonth(){
         var sum=0;
        var currentDate = new Date();
        this._monList.forEach(element =>{
            if((element._type == "ΕΞΟΔΟ" && element._datee.getMonth() == currentDate.getMonth()) && element._datee.getYear() == currentDate.getYear() ){
                sum+=element._amount }});
        return sum;
}

takeExpenseToday(){
        var sum=0;
       var currentDate = new Date();
       this._monList.forEach(element =>{
           if((element._type == "ΕΞΟΔΟ" && element._datee.getDate() == currentDate.getDate() && element._datee.getYear() == currentDate.getYear() )){
               sum+=element._amount }});
       return sum;
}

   takeIncomeToday(){
    var sum=0;
   var currentDate = new Date();
   this._monList.forEach(element =>{
       if((element._type == "ΕΣΟΔΟ" && element._datee.getDate() == currentDate.getDate() && element._datee.getYear() == currentDate.getYear() )){
           sum+=element._amount }});
   return sum;
}
 
takeSumExpPerMonth(mo){
    var sum=0;
    var currentDate = new Date();
    this._monList.forEach(element =>{
        if(element._type == "ΕΞΟΔΟ" && element._datee.getMonth() == mo && element._datee.getYear() == currentDate.getYear()){
           
            sum+=element._amount }});
            
    return sum;
}
 
takeSumInPerMonth(mo){
    var sum=0;
    var currentDate = new Date();
    this._monList.forEach(element =>{
        if(element._type == "ΕΣΟΔΟ" && element._datee.getMonth() == mo && element._datee.getYear() == currentDate.getYear()){
           
            sum+=element._amount }});
            
    return sum;
}

deleteFromList=(val)=>{
         
        // Remove one document from the collection
        // options set to {} since the default for multi is false
        this.db.remove({ _id: val }, {}, function (err, numRemoved) {
            
        });
        this.refreshData();
         
          
}

modifyVal(valold,valnew){
        this.deleteFromList(valold);
        this.saveToList(valnew);
        this.refreshData();
}

takeListOfIncomeMonth(){
    var temp=[];
    var currentDate = new Date();
    this._monList.forEach(element =>{
        if(element._type == "ΕΣΟΔΟ" && element._datee.getMonth() == currentDate.getMonth() && element._datee.getYear() == currentDate.getYear()){
           temp.push(element) 
        }});
            
    return temp;
}

takeListOfIncomeDay(){
    var temp=[];
    var currentDate = new Date();
    this._monList.forEach(element =>{
        if(element._type == "ΕΣΟΔΟ" && element._datee.getDate() == currentDate.getDate() && element._datee.getYear() == currentDate.getYear()){
           temp.push(element) 
        }});
            
    return temp;
}
 
takeListOfIncomeWeek(){
    var temp=[];
    var currentDate = new Date(new Date().setHours(0,0,0,0));
    var minDate = new Date(new Date().setHours(0,0,0,0));
    minDate.setDate(minDate.getDate()-minDate.getDay());
    var maxDate = new Date();
    
    maxDate.setDate(maxDate.getDate() +(7 - maxDate.getDay()));
   
    this._monList.forEach(element =>{
        if(element._type == "ΕΣΟΔΟ" && 
            element._datee >= minDate && element._datee <= maxDate && 
                element._datee.getYear() == currentDate.getYear()){
                   
           temp.push(element) 
        }});
            
    return temp;
}


takeListOfOutcomeMonth(){
    var temp=[];
    var currentDate = new Date(new Date().setHours(0,0,0,0));
    this._monList.forEach(element =>{
        if(element._type == "ΕΞΟΔΟ" && element._datee.getMonth() == currentDate.getMonth() && element._datee.getYear() == currentDate.getYear()){
           temp.push(element) 
        }});
            
    return temp;
}

takeListOfOutcomeDay(){
    var temp=[];
    var currentDate = new Date(new Date().setHours(0,0,0,0));
    this._monList.forEach(element =>{
        if(element._type == "ΕΞΟΔΟ" && element._datee.getDate() == currentDate.getDate() && element._datee.getYear() == currentDate.getYear()){
           temp.push(element) 
        }});
            
    return temp;
}
 
takeListOfOutcomeWeek(){
    var temp=[];
    var currentDate = new Date(new Date().setHours(0,0,0,0));
    var minDate = new Date(new Date().setHours(0,0,0,0));
    minDate.setDate(minDate.getDate()-minDate.getDay());
    var maxDate = new Date();
    
    maxDate.setDate(maxDate.getDate() +(7 - maxDate.getDay()));
   
    this._monList.forEach(element =>{
        if(element._type == "ΕΞΟΔΟ" && 
            element._datee >= minDate && element._datee <= maxDate && 
                element._datee.getYear() == currentDate.getYear()){
           temp.push(element) 
        }});
            
    return temp;
}

takeIncomeWeek(){
    var sum=0;
   var currentDate = new Date(new Date().setHours(0,0,0,0));
   var minDate = new Date(new Date().setHours(0,0,0,0));
    minDate.setDate(minDate.getDate()-minDate.getDay());
    var maxDate = new Date();
    
    maxDate.setDate(maxDate.getDate() +(7 - maxDate.getDay()));
   
   this._monList.forEach(element =>{
       if((element._type == "ΕΣΟΔΟ" && 
             element._datee >= minDate && element._datee <= maxDate && 
                element._datee.getYear() == currentDate.getYear() )){
           sum+=element._amount }});
   return sum;
}

takeOutcomeWeek(){
    var sum=0;
   var currentDate = new Date(new Date().setHours(0,0,0,0));
   var minDate = new Date(new Date().setHours(0,0,0,0));
    minDate.setDate(minDate.getDate()-minDate.getDay());
    var maxDate = new Date();
    
    maxDate.setDate(maxDate.getDate() +(7 - maxDate.getDay()));
   
   this._monList.forEach(element =>{
       if((element._type == "ΕΞΟΔΟ" && 
             element._datee >= minDate && element._datee <= maxDate && 
                element._datee.getYear() == currentDate.getYear() )){
           sum+=element._amount }});
   return sum;
}


deleteAllElementsFromDB(){
    // Removing all documents with the 'match-all' query
this.db.remove({}, { multi: true }, function (err, numRemoved) {
    
});
}
}

module.exports = Operations
