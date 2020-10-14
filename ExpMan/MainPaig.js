//Import libraries
import React, {Component} from 'react';
import {Avatar} from 'react-native-elements'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Octicons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Operations  from './ListOperations';
import {NavigationEvents} from 'react-navigation';
import styles from './Styles/styleMainPaig';
import LinearGradient from 'react-native-linear-gradient'; 

import {Text,View,Dimensions,ScrollView,TouchableOpacity, Image,  Animated, BackHandler, ImageBackground} from 'react-native';
import Money from './Money';
 
export default class MainPage extends Component {
  
 
  state = {
    money: new Money(),
    lista : new Operations(),
    sumIn : 0,
    sumOut: 0,
    opac: 0,
    vall: 1,
    todayExp: 0,
    todayIn: 0,
    listOfComp: [],
    moveAnimation : new Animated.ValueXY({ x: -1500, y: 0 }),
    name:'',
    goal:0,
    xronos:'',
    st: '',
    val:0,
    url:null,
     
  }


   

 componentWillMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  
  BackHandler.exitApp()
  return true;
}

 static navigationOptions = ({ navigation, screenProps }) => ({
  title: 'Αρχικη',
  headerStyle:{ backgroundColor: '#838996'},
  headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
  headerRight: () => <Image style= {styles.img}  source ={require('./ic_launcher.png')}/>
});

componentWillMount() {
  this.state.lista.refreshData();
  this.state.lista._retrieveData1();
  this.state.lista._retrieveData2();
  this.state.lista._retrieveData3();
    this.setRenderFunc();
    setTimeout( ()=>{this.state.lista._retrieveData3()},500);
}
 
showMenu= () =>{
  if(this.state.vall %2 ==1){
    this._moveMenu(0)
     
  }else{
    this._moveMenu(-1500)
   
  }
}
 

 refresh () {
  this.props.navigation.setParams({
    headerLeft: () =>  <TouchableOpacity  onPress ={() => {this.setState({vall : this.state.vall + 1},this.showMenu())}}>
     <Icon1 name="menu-outline" size={30} color='#c4cace' />
   </TouchableOpacity>  
    })
    this.state.lista.refreshData();
    this.state.lista._retrieveData1();
    this.state.lista._retrieveData2();
    this.state.lista._retrieveData3();
    setTimeout( ()=>{this.setRenderFunc()},500);
   
 
}

setGoals= () =>{
  if(Number(this.state.val) <= Number(this.state.goal)){
    this.setState({st: 'ΜΕΣΑ'})
    this.setState({url: require('./images/gifs/happy.gif')})
  }else{
    this.setState({st: 'ΕΚΤΟΣ'})
    this.setState({url: require('./images/gifs/tenor.gif')})
  }
}

setRenderFunc =() => {
  if(this.state.lista._persontime==0){this.setState({xronos: 'Εβδομαδιαιος'},()=>{this.setState({val: this.state.lista.takeOutcomeWeek()})})}
  if(this.state.lista._persontime==1){this.setState({xronos: 'Μηνιαιος'},()=>{this.setState({val: this.state.lista.takeExpenseCurMonth()})})}
  this.setState({goal: this.state.lista._persongoal},()=>{this.setGoals()},this.setState({name: this.state.lista._personname}))
  const screenWidth = Dimensions.get("window").width;
  var tmplist = [];
  var tmpDat = new Date();
   this.state.lista._monList.map((element) =>{
    if(element._type == "ΕΣΟΔΟ" && element._datee.getMonth() == tmpDat.getMonth()){
      tmplist.push(<View style={{flexDirection:'row',width: screenWidth/2 +3,borderRightWidth:3, borderRightColor:'#93E9BE',justifyContent:'flex-end'}}>
        <Text style={{fontSize:16,padding:4,fontStyle:'italic'}}>{element._category}: {element._amount}€</Text>
        
            <Icon2  name='arrow-with-circle-right' size={35} color='#93E9BE'  /> 
             
        </View>)
    }else if(element._type == "ΕΞΟΔΟ" && element._datee.getMonth() == tmpDat.getMonth()){
      tmplist.push(<View style={{flexDirection:'row',alignSelf:'flex-end',width: screenWidth/2,borderLeftWidth:3,borderLeftColor:'orange'}}>
     <Icon2 name='arrow-with-circle-left' size={35} color='orange'  /> 
        <Text style={{fontSize:16,padding:4,fontStyle:'italic'}}>{element._category}: {element._amount}€ </Text>
        </View>)
    }
  })
  this.setState({
    listOfComp: [tmplist]
})
}
 
_moveMenu = (val) => {
  Animated.spring(this.state.moveAnimation, {
    toValue: {x: val, y: 0},
  }).start()
}


render() {   
  const {navigate} = this.props.navigation;
   
  return (
    
    <View  style={styles.container}> 
   
    {/*trigger when we return to the main page*/}
    <NavigationEvents onWillFocus={() => {this.refresh()}} />
    {/*////////////////////////////////////////////*/}


    {/******************************         M    E     N     U      ********************************** */}
    <Animated.View   style = {[styles.menu, this.state.moveAnimation.getLayout()]}>
      {/*////////////////////////////////////////////////*/}
       <TouchableOpacity style = {styles.tch} onPress={() => {navigate('Cale', {List1: this.state.lista._monList});}}>
         <Icon name="calendar" size={30} color='#c4cace' />
         <Text>Ημερολογιο</Text>
       </TouchableOpacity>

       <TouchableOpacity style = {styles.tch1} onPress={() => {navigate('ExpForm1',{List1:this.state.lista});}}>
         <Icon name="plus" size={30} color='#c4cace' />
         <Text>Προσθηκη</Text>
       </TouchableOpacity>

          
       <TouchableOpacity style = {styles.tch2}onPress={() => {navigate('PiieChart', {List1: this.state.lista});}}>
         <Icon1 name="ios-stats-chart-sharp" size={28} color='#c4cace' />
         <Text style = {{textAlign: 'center'}} >Στατιστικα Στοιχεια</Text>
       </TouchableOpacity>

       <TouchableOpacity style = {styles.tch3} onPress={() => {navigate('ModifyClass',{List1: this.state.lista});}}>
         <Icon name="tools" size={30} color='#c4cace' />
         <Text>Τροποποιηση</Text>
       </TouchableOpacity>
      

      <TouchableOpacity style = {styles.tch4} onPress={() => {navigate('Isologismos',{List1: this.state.lista});}}>
         <Icon3 name="balance-scale-left" size={30} color='#c4cace' />
         <Text>Ισοζύγιο </Text>
       </TouchableOpacity>

       <TouchableOpacity style = {styles.tch5} onPress={() => {navigate('Settings',{List1: this.state.lista});}}>
         <Icon1 name="settings-sharp" size={30} color='#c4cace' />
         <Text>Ρυθμισεις </Text>
       </TouchableOpacity>
       </Animated.View>
       {/*////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      
      {/*//////////////////////   Banner in the main screen /////////////////////////////*/}
      <Swiper height={250} showsPagination={true} style={styles.swiper}  showsButtons={true} autoplay autoplayTimeout={4.5}>
          <View style={styles.slide1}> 
          <LinearGradient
          colors={['#304352', '#d7d2cc']}
          style={{width:'100%',justifyContent:'center',alignItems:'center',height:'100%'}}
        >
              
              <Text style={styles.title}>FINANCIAL MANAGER</Text>
              <Text style={styles.txt}>Η Καλυτερη εφαρμογη για παρακολουθηση και διαχειρηση των προσωπικων σας εσοδων και εξοδων...</Text>
              </LinearGradient> 
          </View>

          <View style={styles.slide2}> 
          <LinearGradient
          colors={['#20002c', '#cbb4d4']}
          style={{width:'100%',justifyContent:'center',alignItems:'center',height:'100%'}}
        >
             <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Avatar size='xlarge' rounded source={require('./images/stoxos.png')}/>
                <Text style={styles.goal}>{this.state.goal}€</Text>
              </View>
              <Text style= {styles.txt1}>Ο {this.state.xronos} Στοχος σου</Text>
            </LinearGradient>

          </View>

          <View style={styles.slide3}> 
          <LinearGradient
          colors={[ '#1d2b64', '#f8cdda']}
          style={{width:'100%',justifyContent:'center',alignItems:'center',height:'100%'}}
        >
          <ImageBackground style={{height:100,width:100}}source={this.state.url} />
          <Text>{this.state.name},εισαι {this.state.st} των στοχων σου</Text>
          <Text>{this.state.val}/{this.state.goal}</Text>
          </LinearGradient>
          </View>


      </Swiper>
      {/*//////////////////////////////////////////////////////////////////// */}

        {/* The list on main screen with trabsactions*/}
       
        <LinearGradient
          colors={['#ffffff','#abbaab' ]}
          style={styles.linearGradient}
        >
        <Text style= {styles.listM}> ΛΙΣΤΑ ΣΥΝΑΛΛΑΓΩΝ ΤΡΕΧΟΝΤΟΣ ΜΗΝΑ</Text>
        <ScrollView style={{ top:5,maxHeight:200,minHeight:200 }}   contentContainerStyle={{ flexGrow: 1,flexDirection:'column'}}>
      {this.state.listOfComp}
      
    </ScrollView>
    </LinearGradient>
    </View>
  );

  
}
};

 