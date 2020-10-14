import { Avatar, Input } from 'react-native-elements';
import React, {Component} from 'react'; 
import { CheckBox,Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet, 
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  ToastAndroid,
   ImageBackground
} from 'react-native';
import Operations  from './ListOperations';
import LinearGradient from 'react-native-linear-gradient';
export default class LogInPage extends Component {
    static navigationOptions = {  
        headerShown: false,
      };

  state= {
       checked:false,
       checked1:false,
       name:'',
       goal: 0,
       lista : new Operations(),
    time:9
  }

  setChecked=() =>{
      if(this.state.checked==false){
          if(this.state.checked1==true){
              this.setState({checked1: false})
          }
          this.setState({checked: true})
      }else{
        this.setState({checked: false})
      }
  }  

  
  setChecked1=() =>{
    if(this.state.checked1==false){
        if(this.state.checked==true){
            this.setState({checked: false})
        }
        this.setState({checked1: true})
    }else{
      this.setState({checked1: false})
    }
} 
 
finish= () =>{
    const {navigate} = this.props.navigation;
   
    if(this.state.name == '' || this.state.goal ==0 || this.state.checked == false && this.state.checked1 == false){
        ToastAndroid.show('Συμπληρωσε ολα τα πεδια',ToastAndroid.SHORT);

    }else{
        this.state.lista.savePersonalData2(this.state.goal);
        this.state.lista.savePersonalData1(this.state.name);
        if(this.state.checked1== true) this.state.lista.savePersonalData3('1');
        if(this.state.checked==true ) this.state.lista.savePersonalData3('0');
        navigate('MainPage');
    }
}
  render() {
    

    return (
        
      <View style={styles.container}>
        <LinearGradient
          colors={['#ffd89b', '#19547b']}
          style={styles.theImage}
        >
        <Text style={styles.logo}>Συμπληρωσε τα στοιχεια σου</Text>
        <Avatar rounded  containerStyle={{alignSelf:'center',top:50}} size= 'xlarge' source={require('./ic_launcher.png')}/>
        <Input placeholder='Ονομα' containerStyle={styles.name1} leftIcon={{ type: 'Ionicons', name: 'people' }}  onChangeText={value => this.setState({ name: value })} />
        <Input placeholder='Στοχος (Να χαλας λιγοτερα χρηματα)' keyboardType={'number-pad'} containerStyle={styles.goal} leftIcon={{ type: 'feather', name: 'target' }}  onChangeText={value => this.setState({ goal: value })} />
        <CheckBox checkedColor={'black'} containerStyle={{position:'absolute',top:'70%',flexDirection:'row' ,backgroundColor:'transparent',borderColor:'transparent'}} title='Εμδομαδιαιως' checked={this.state.checked} onPress={() => {this.setChecked()}}/>
        <CheckBox checkedColor={'black'} containerStyle={{position:'absolute',top:'70%',backgroundColor:'transparent',borderColor:'transparent', flexDirection:'row',right:5}} title='Μηνιαιως' checked={this.state.checked1} onPress={() => {this.setChecked1()}}/>
        <Button containerStyle={{position:'absolute',top:'80%',left: '40%' ,backgroundColor:'transparent'}} icon={<Icon name="arrow-right" style={{paddingLeft:10}} size={15} color="aqua" />} iconRight title="Επομενο" onPress= {() => {this.finish()}} raised/>
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

  name1: {
    position:'absolute',
     
    top:'50%'
  },
  
  
  goal: {
    position:'absolute',
     
    top:'60%'
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});
