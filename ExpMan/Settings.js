import React, { Component } from "react";
import { StyleSheet, View, Text, PermissionsAndroid,ToastAndroid } from "react-native";
import Operations from './ListOperations';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import {NavigationEvents} from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import { BackHandler } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import XLSX from 'xlsx'
import Dialog from "react-native-dialog";
import {writeFile,DownloadDirectoryPath} from "react-native-fs"
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const output =str =>str
export default class Settings extends Component {
  static navigationOptions = {  
    headerShown: false,
  };
   
  constructor(props){
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     this.exportFile = this.exportFile.bind(this)
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueChange1 = this.onValueChange1.bind(this);
  }
state={
 
  listCo: new Operations(),
  switchValue: false,
  switchValue1: false,
  isDialogVisible: false,
  isDialogVisible1: false,
  isDialogVisibleExcel: false,
  DDP : DownloadDirectoryPath + '/',
  nameOfFile: '',
  timePeriod: 1,
  dialogVisibleFinal: false,
  ExcelPdfVal: '6',
   
}
requestRuntimePermissionPDF= (name,val) =>{
  var that = this
   async function externalStoragePermission() {
     try{
       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         {
           title: 'AAAAAA',
           message:'adsfs'
         });
         if(granted === PermissionsAndroid.RESULTS.GRANTED){
           that.createPDF(name,val);
         }
     }catch(err){
       console.warn(err)
     }
   }
   externalStoragePermission();

}

async createPDF(name,val) {
  var data,data1,data2;
  if(val== 0){
      data1 = this.state.listCo.takeListOfIncomeWeek();
      data2 = this.state.listCo.takeListOfOutcomeWeek();
      data =  data1.concat(data2)
   }else if(val == 1){
      data1 = this.state.listCo.takeListOfIncomeMonth();
      data2 = this.state.listCo.takeListOfOutcomeMonth();
      data =  data1.concat(data2)
   }else{
      data = this.state.listCo._monList;
   }

  let options = {
    html:  this.finalTable(data) ,
    fileName: name,
    directory: 'Download/',
  };

  let file = await RNHTMLtoPDF.convert(options)
  // console.log(file.filePath);
  ToastAndroid.show(JSON.stringify(file.filePath),ToastAndroid.LONG);
}


finalTable(table) {
  return (
     `<div>
        <h1 id='title'>ΠΙΝΑΚΑΣ</h1>
        <table id='Money'>
           <tbody>` +
              this.renderTableHeader() +
              this.renderTableData(table) +
           `</tbody>
        </table>
     </div>`
  )
}

renderTableHeader() {
 
     return (`
       <tr>
            <th>ΠΟΣΟ</th>
            <th>ΤΥΠΟΣ</th>
            <th>ΚΑΤΗΓΟΡΙΑ</th>
            <th>ΗΜΕΡΟΜΗΝΙΑ</th>
            <th>ΠΕΡΙΓΡΑΦΗ</th>
        </tr>`
     )
  
}

renderTableData(table) {
  return table.map((i) => {
    var str = i._datee.getDate() + '/' + i._datee.getMonth() + '/' + (i._datee.getYear()-100)
     return (
        `<tr>
           <td>`+i._amount+ `</td>
           <td>`+ i._type+`</td>
           <td>`+i._category+`</td>
           <td>`+str+`</td>
           <td>`+i._description+`</td>
        </tr>`
    )
  })
}




 requestRuntimePermission= (name,val) =>{
   var that = this
    async function externalStoragePermission() {
      try{
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'AAAAAA',
            message:'adsfs'
          });
          if(granted === PermissionsAndroid.RESULTS.GRANTED){
            that.exportFile(name,val);
          }
      }catch(err){
        console.warn(err)
      }
    }
    externalStoragePermission();

 }
 
 exportFile=(name,val)=>{
   if(val== 0){
    var data1 = this.state.listCo.takeListOfIncomeWeek();
    var data2 = this.state.listCo.takeListOfOutcomeWeek();
    var data =  data1.concat(data2)
   }else if(val == 1){
    var data1 = this.state.listCo.takeListOfIncomeMonth();
    var data2 = this.state.listCo.takeListOfOutcomeMonth();
    var data =  data1.concat(data2)
   }else{
    var data = this.state.listCo._monList;
   }
   

   const ws = XLSX.utils.json_to_sheet(data);

   const wb = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

   const wbout = XLSX.write(wb, {type:"binary",bookType:"xlsx"});
   const file = this.state.DDP + name +'.xlsx'
   writeFile(file,output(wbout), 'ascii').then((res) => {
     ToastAndroid.show("Το Αρχειο δημιουργηθηκε με επιτυχια",ToastAndroid.SHORT)

   }).catch((err) => {ToastAndroid.show(wrr.message,ToastAndroid.LONG)});
  }

componentWillMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  if(this.state.switchValue == true){
    this.state.listCo.savePersonalData3('0')
  }else if(this.state.switchValue1 == true){
    this.state.listCo.savePersonalData3('1')
  }
  this.props.navigation.navigate('MainPage');
  return true;
}

iAmBack= () => {
    this.setState({listCo : this.props.navigation.getParam('List1', 'NO-ID')},()=>{this.setValues()})
}

onValueChange(value){
  this.setState({switchValue: value});
  this.setState({switchValue1: !value});
}

onValueChange1(value){
  this.setState({switchValue: !value});
  this.setState({switchValue1:  value});
}

setValues(){
   
  if(this.state.listCo._persontime==0){
    
    this.setState({switchValue: true})
    this.setState({switchValue1: false})
}else{
  this.setState({switchValue: false})
  this.setState({switchValue1: true})
} 
}

setGoal(){
  this.setState({isDialogVisible: true})
}

setName(){
  this.setState({isDialogVisible1: true})
}

showDialog(val){
  this.setState({isDialogVisible: val})
  
 
}

showDialog1(val){
  
  this.setState({isDialogVisible1: val})
 
}

sendInput(val){
   
    this.state.listCo.savePersonalData2(val)
   
  this.setState({isDialogVisible: false})
  ToastAndroid.show("Επιτυχης Ενημερωση!",ToastAndroid.SHORT)
}

sendInput1(val){
  if(val !=''){
    this.state.listCo.savePersonalData1(val)
  }
 
  this.setState({isDialogVisible1: false})
  ToastAndroid.show("Επιτυχης Ενημερωση!",ToastAndroid.SHORT)
}

sendInputExcel(val){
  if(val !=''){
    this.setState({nameOfFile: val},()=>{this.setState({dialogVisibleFinal: true})})
    ToastAndroid.show("Θεση αρχειου: " + JSON.stringify(this.state.DDP  + this.state.nameOfFile),ToastAndroid.SHORT)
  }else{
    ToastAndroid.show("Μη Εγκυρο ονομα αρχειου",ToastAndroid.SHORT)
  }
  this.setState({isDialogVisibleExcel: false})
}

showDialogExcel(val,val1){
  this.setState({isDialogVisibleExcel: val})
  this.setState({ExcelPdfVal: val1})
}
 
dialogfin=(val)=>{
  if(this.state.ExcelPdfVal=='1'){
    this.setState({timePeriod: val},() => {this.requestRuntimePermission(this.state.nameOfFile,this.state.timePeriod)})
  }else if(this.state.ExcelPdfVal=='2'){

    this.setState({timePeriod: val},() => {this.requestRuntimePermissionPDF(this.state.nameOfFile,this.state.timePeriod)})
 
  }
  this.setState({dialogVisibleFinal: false})
}

render() {
   
  return (
   
    <View style={{backgroundColor:'#EFEFF4',flex:1}}>


    {/*trigger when we return to the main page*/}
    <NavigationEvents onWillFocus={() => {this.iAmBack()}} />
    {/*////////////////////////////////////////////*/}

    
      <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
     
    {/*////////////////////////////////////////DIALOGS BLOCK////////////////////////////////////////////////*/}
      <DialogInput isDialogVisible={this.state.isDialogVisible}
                title={"Αλλαγη Στοχου"}
                hintInput ={"πχ 400"}
                textInputProps ={{keyboardType:'numeric'}}
                submitInput={ (inputText) => {this.sendInput(inputText)} }
                closeDialog={ () => {this.showDialog(false)}}>
      </DialogInput>

      <DialogInput isDialogVisible={this.state.isDialogVisible1}
                title={"Αλλαγη Ονοματος"}
                hintInput ={"πχ Γιωργος,john"}
                submitInput={ (inputText1) => {this.sendInput1(inputText1)}  }
                closeDialog={ () => {this.showDialog1(false)}}>
      </DialogInput>

      <DialogInput isDialogVisible={this.state.isDialogVisibleExcel}
                title={"Ονομα Αρχειου"}
                hintInput ={"Αναφορα,Example"}
                submitInput={ (inputText) => {this.sendInputExcel(inputText)}  }
                closeDialog={ () => {this.showDialogExcel(false)}}>
      </DialogInput>

      <Dialog.Container  visible={this.state.dialogVisibleFinal}>
          <Dialog.Title>Επελεξε Περιοδο</Dialog.Title>
          <Dialog.Description>
            Χρονικη περιοδο Συναλλαγων
          </Dialog.Description>
          <Dialog.Button label="Εβδομαδα" onPress={()=>{this.dialogfin(0)}} />
          <Dialog.Button label="Μηνα" onPress={()=>{this.dialogfin(1)}}/>
          <Dialog.Button label="Συνολικο" onPress={()=>{this.dialogfin(2)}}/>
        </Dialog.Container>
      {/*////////////////////////////////////////////////////////////////////////////////////////*/}
        <Text style={{alignSelf:'center',marginTop:15,marginBottom:10,fontWeight:'bold',fontSize:18}}>Ρυθμισεις</Text>
      </View>
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>

        {/*********************************SETTINGS LIST************************************/}
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            icon={<Icon3 name ="target" size={30} style={styles.imageStyle}/>}
            hasSwitch={true}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            switchProps={{justifyContent:'flex-start'}}
            hasNavArrow={false}
            title='Εβδομαδιαιος Στοχος'
          />
          <SettingsList.Item
            icon={<Icon3 name ="target" size={30} style={styles.imageStyle}/>}
            hasSwitch={true}
            switchState={this.state.switchValue1}
            switchOnValueChange={this.onValueChange1}
            switchProps={{justifyContent:'flex-start'}}
            hasNavArrow={false}
            title='Μηνιαιος Στοχος'
          />
          <SettingsList.Item
            icon={<Icon4 name ="money-bill-wave" size={28} style={styles.imageStyle}/>}
            title='Ποσο '
            titleInfo={'(Στοχος)  ' +  this.state.listCo._persongoal +'€'}
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => {this.setGoal()}}
          />

           
          <SettingsList.Item
            icon={<Icon name ="people" size={30} style={styles.imageStyle}/>}
            title='Ονομα'
            titleInfo= {this.state.listCo._personname}
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => {this.setName()}}
          />
         
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            icon={<Icon1 name ="microsoft-excel" size={30} style={styles.imageStyle}/>}
            title='Δημιουργια Excel'
            onPress={() => {this.showDialogExcel(true,'1')}}
          />
          <SettingsList.Item
            icon={<Icon1 name ="file-pdf-outline" size={30} style={styles.imageStyle}/>}
            title='Δημιουργια PDF'
            onPress={() => {this.showDialogExcel(true,'2')}}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            icon={<Icon2 name ="not-interested" size={30} style={styles.imageStyle}/>}
            title='Διαγραφη Δεδομενων'
            onPress={() =>{this.state.listCo.deleteAllElementsFromDB(),ToastAndroid.show("Διαγραφη ολων των δεδομενων...",ToastAndroid.LONG)}}
          />
        </SettingsList>
          {/********************************************************************************/}

    </View>

            
    </View>
  );
}

};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(252,224,139)',
        alignItems:'center'
    },
    list:{
        fontSize:20,
        borderBottomWidth:3,
        top:'20%',
        padding:20

    },
    imageStyle:{
      alignSelf:'center',
      width:40,
      height:40,
      justifyContent:'flex-start'
    }
 });

 
