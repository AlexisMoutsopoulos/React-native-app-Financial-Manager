import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView ,Dimensions, ToastAndroid, Text, View,Image } from 'react-native';
import Swiper from 'react-native-swiper'
import {CheckBox} from 'react-native-elements'
import PercentageCircle from 'react-native-percentage-circle';
import PureChart from 'react-native-pure-chart';
import Operations  from './ListOperations';
import {NavigationEvents} from 'react-navigation';
import { BackHandler } from 'react-native';
import {LineChart,PieChart} from "react-native-chart-kit";
/* 
* Class about statistics
*/
export default class PiieChart extends Component {

static navigationOptions = ({ navigation, screenProps }) => ({
  title: 'Στατιστικα Στοιχεια',
  headerStyle:{ backgroundColor: '#2a9df4'},
  headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
  headerRight: () => <Image style= {styles.img}  source ={require('./images/stats.png')}/>
});

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     this.state = {
       lista : new Operations(),
       ///////////////////////////////////
       sumSalary : 0,
       sumTips: 0,
       sumGift :0,
       sumOtherIn: 0,
       sumGamIn: 0,
       ///////////////////////////////////
       sumPsy : 0,
       sumBuy: 0,
       sumFuel :0,
       sumOtherOut: 0,
       sumSuper: 0,
       sumCof: 0,
       sumDrink:0 ,
       sumEat:0 ,
       sumBills:0,
       sumKids:0,
       sumGamOut:0,
       sumPhone:0,
       sumHome:0,
       sumCar:0,
       sumAni:0,
       //////////////////////////////////
       source: 'PieChart',
       isChecked: false,
       pososto: 0,
       expPerMon: [0,0,0,0,0,0,0,0,0,0,0,0],
       incPerMon: [0,0,0,0,0,0,0,0,0,0,0,0],
       gainPerMon: [0,0,0,0,0,0,0,0,0,0,0,0],
       numClick:0,
       textIn1:'',
       textIn2:'',
       textIn3:'',
       textIn4:'',
       textOut1:'',
       textOut2:'',
       textOut3:'',
       textOut4:'',
       textOut5:'',
        
       
     }
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
/*
  When we are back to this screen
 */ 
iAmBack= () => {
  this.setState({lista : this.props.navigation.getParam('List1', 'NO-ID')},() => {this.mainFunc()})    
}
  
mainFunc = () =>{
    var jan = this.state.lista.takeSumExpPerMonth(0);
    var feb = this.state.lista.takeSumExpPerMonth(1);
    var mar = this.state.lista.takeSumExpPerMonth(2);
    var apr = this.state.lista.takeSumExpPerMonth(3);
    var may = this.state.lista.takeSumExpPerMonth(4);
    var jun = this.state.lista.takeSumExpPerMonth(5);
    var jul = this.state.lista.takeSumExpPerMonth(6);
    var aug = this.state.lista.takeSumExpPerMonth(7);
    var sep = this.state.lista.takeSumExpPerMonth(8);
    var okt = this.state.lista.takeSumExpPerMonth(9);
    var nov = this.state.lista.takeSumExpPerMonth(10);
    var dec = this.state.lista.takeSumExpPerMonth(11);

    var jan1 = this.state.lista.takeSumInPerMonth(0);
    var feb1 = this.state.lista.takeSumInPerMonth(1);
    var mar1 = this.state.lista.takeSumInPerMonth(2);
    var apr1 = this.state.lista.takeSumInPerMonth(3);
    var may1 = this.state.lista.takeSumInPerMonth(4);
    var jun1 = this.state.lista.takeSumInPerMonth(5);
    var jul1 = this.state.lista.takeSumInPerMonth(6);
    var aug1 = this.state.lista.takeSumInPerMonth(7);
    var sep1 = this.state.lista.takeSumInPerMonth(8);
    var okt1 = this.state.lista.takeSumInPerMonth(9);
    var nov1 = this.state.lista.takeSumInPerMonth(10);
    var dec1 = this.state.lista.takeSumInPerMonth(11);
      /////////////////////////////////////////////////////////////////////
     this.setState({sumSalary : this.state.lista.takeSumCatIn('Μισθος'),
     sumGift : this.state.lista.takeSumCatIn('Δωρο'),
     sumTips : this.state.lista.takeSumCatIn('Χαρτζιλικι'),
     sumOtherIn : this.state.lista.takeSumCatIn('Αλλο'),
     sumGamIn : this.state.lista.takeSumCatIn('Τζογος :)'),
     //////////////////////////////////////////////////////////////////////
     sumBuy : this.state.lista.takeSumCatOut('Αγορα'),
     sumFuel : this.state.lista.takeSumCatOut('Καυσιμα'),
     sumPsy : this.state.lista.takeSumCatOut('Ψυχαγωγεια'),
     sumOtherOut : this.state.lista.takeSumCatOut('Αλλο'),
     sumSuper : this.state.lista.takeSumCatOut('Σουπερ Μαρκετ'),
     sumGamOut: this.state.lista.takeSumCatOut('Τζογος'),
     sumHome: this.state.lista.takeSumCatOut('Σπιτι'),
     sumKids: this.state.lista.takeSumCatOut('Παιδια'),
     sumPhone: this.state.lista.takeSumCatOut('Τηλεφωνο'),
     sumEat: this.state.lista.takeSumCatOut('Φαγητο'),
     sumDrink: this.state.lista.takeSumCatOut('Ποτο'),
     sumCof: this.state.lista.takeSumCatOut('Καφες'),
     sumBills: this.state.lista.takeSumCatOut('Λογαριασμοι'),
     sumCar: this.state.lista.takeSumCatOut('Αυτοκινητο'),
     sumAni: this.state.lista.takeSumCatOut('Κατοικιδια'),
     ////////////////////////////////////////////////////////////////////

     expPerMon: [jan,feb,mar,apr,may,jun,jul,aug,sep,okt,nov,dec],
     incPerMon: [jan1,feb1,mar1,apr1,may1,jun1,jul1,aug1,sep1,okt1,nov1,dec1],
     gainPerMon:[jan1-jan,feb1,feb,mar1-mar,apr1-apr,may1-may,jun1-jun,jul1-jul,aug1-aug,sep1-sep,okt1-okt,nov1-nov,dec1-dec]
    },this.operations)     
}

onDataPointClick = () => {
  ToastAndroid.show("value",ToastAndroid.SHORT);
}

/*
  Calculate the percentage
 */
operations=()=>{
      var sumIn = this.state.sumGamIn  +this.state.sumSalary + this.state.sumTips + this.state.sumOtherIn + this.state.sumGift;
      var sumOut = this.state.sumAni +this.state.sumPhone +this.state.sumBills +this.state.sumEat +this.state.sumHome  +this.state.sumGamOut +this.state.sumKids +this.state.sumCof +this.state.sumDrink +this.state.sumCar +this.state.sumSuper + this.state.sumPsy + this.state.sumOtherOut + this.state.sumBuy + this.state.sumFuel;
     
      if(sumIn != 0){
        
       
      var temppp =Number(( sumOut/sumIn)*100).toFixed(2);
        
    
      this.setState({pososto: temppp})
      }

      
}

 
 
  render() {
    var labels = ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαι", "Ιουν","Ιουλ","Αυγ","Σεπτ","Οκτ","Νοε","Δε"]
    let sampleData = [
      {
        seriesName: 'series1',
        data: [
          {x: labels[0], y: this.state.incPerMon[0]},
          {x: labels[1], y: this.state.incPerMon[1]},
          {x: labels[2], y: this.state.incPerMon[2]},
          {x: labels[3], y: this.state.incPerMon[3]},
          {x: labels[4], y: this.state.incPerMon[4]},
          {x: labels[5], y: this.state.incPerMon[5]},
          {x: labels[6], y: this.state.incPerMon[6]},
          {x: labels[7], y: this.state.incPerMon[7]},
          {x: labels[8], y: this.state.incPerMon[8]},
          {x: labels[9], y: this.state.incPerMon[9]},
          {x: labels[10], y: this.state.incPerMon[10]},
          {x: labels[11], y: this.state.incPerMon[11]},
        ],
        color: '#93E9BE'
      },
      {
        seriesName: 'series2',
        data: [
          {x: labels[0], y: this.state.expPerMon[0]},
          {x: labels[1], y: this.state.expPerMon[1]},
          {x: labels[2], y: this.state.expPerMon[2]},
          {x: labels[3], y: this.state.expPerMon[3]},
          {x: labels[4], y: this.state.expPerMon[4]},
          {x: labels[5], y: this.state.expPerMon[5]},
          {x: labels[6], y: this.state.expPerMon[6]},
          {x: labels[7], y: this.state.expPerMon[7]},
          {x: labels[8], y: this.state.expPerMon[8]},
          {x: labels[9], y: this.state.expPerMon[9]},
          {x: labels[10], y: this.state.expPerMon[10]},
          {x: labels[11], y: this.state.expPerMon[11]},
        ],
        color: 'orange'
      }
    ]

 
     const data1 = {
      labels: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαι", "Ιουν","Ιουλ","Αυγ","Σεπτ","Οκτ","Νοε","Δε"],
      datasets: [
        {
          data: this.state.gainPerMon
        }
        
      ]
    };
      
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
      backgroundGradientFrom: "white",
      backgroundGradientFromOpacity: 0.3,
      backgroundGradientTo: "white",
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(0, 166, 200, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.3,
      useShadowColorFromDataset: false // optional
    };
  /////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////  
    const data12 = [
      {
        name: "Αγορα",
        amount: this.state.sumBuy,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        
      },
      {
        name: "Κατοικιδια",
        amount: this.state.sumAni,
        color: "gold",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        
      },
      {
        name: "Σουπερ Μαρκετ",
        amount: this.state.sumSuper,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Αλλο",
        amount: this.state.sumOtherOut,
        color: "blue",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Καυσιμα",
        amount: this.state.sumFuel,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Ψυχαγωγια",
        amount: this.state.sumPsy,
        color: "purple",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Αυτοκινητο",
        amount: this.state.sumCar,
        color: "brown",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Καφες",
        amount: this.state.sumCof,
        color: "grey",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Ποτο",
        amount: this.state.sumDrink,
        color: "black",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Φαγητο",
        amount: this.state.sumEat,
        color: "aqua",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Τηλεφωνο",
        amount: this.state.sumPhone,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Τζογος",
        amount: this.state.sumGamOut,
        color: "pink",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Σπιτι",
        amount: this.state.sumHome,
        color: "yellow",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Λογαριασμοι",
        amount: this.state.sumBills,
        color: "purple",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Παιδια",
        amount: this.state.sumKids,
        color: "orange",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      
      }
    ];
 ////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////    
    const data11 = [
      {
        name: "Τζογος :)",
        amount: this.state.sumGamIn,
        color: "rgba(131, 100, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        
      },{
        name: "Χαρτζιλικι",
        amount: this.state.sumTips,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        
      },
      {
        name: "Μισθος",
        amount: this.state.sumSalary,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Αλλο",
        amount: this.state.sumOtherIn,
        color: "blue",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Δωρα",
        amount: this.state.sumGift,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];
    return (
    
        <ScrollView style={styles.main}   contentContainerStyle={{ flexGrow: 1 }}>
            {/*trigger when we return to the main page*/}
    <NavigationEvents onWillFocus={() => {this.iAmBack()}} />
     
          
          <Swiper containerStyle={styles.wrapper} showsPagination={false} height={300} showsButtons={false} autoplay autoplayTimeout={4.5}>
          {/********************************* Income PieChart ****************************************/}
          <View style={styles.slide1}>
          <Text style={styles.title}>Τα εσοδα σου για αυτο τον μηνα</Text>
          <View style={{top:50, right: 15,position:'absolute'}}>
          
            <CheckBox
              title='Ποσοστο...'
              checked={this.state.isChecked}
              onPress={()=>{ this.setState({isChecked: !this.state.isChecked})}}
              checkedColor ='midnightblue'
              uncheckedColor='black'
              containerStyle= {{backgroundColor : '#9DD6EB',borderColor:  '#9DD6EB'}}
            />
            </View>

            <PieChart
              data={data11}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute ={!this.state.isChecked}
            />
          </View>
          {/*************************************************************************************** */}

          {/**************************** Outcome PieChart *******************************************/}
           <View style={styles.slide2}>
           <Text style={styles.title} >Τα εξοδα σου για αυτο τον μηνα</Text>
           <View style={{top:50, right: 15,position:'absolute'}}>
           <CheckBox
              title='Ποσοστο...'
              checked={this.state.isChecked}
              onPress={()=>{ this.setState({isChecked: !this.state.isChecked})}}
              checkedColor ='midnightblue'
              uncheckedColor='black'
              containerStyle= {{backgroundColor : '#97CAE5',borderColor:'#97CAE5'}}
            />
            </View>
           <PieChart
            data={data12}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute ={!this.state.isChecked}
          />
          </View>
         {/*************************************************************************************** */}

        {/********************************** Percentage  *******************************************/}
        <View style={styles.slide3}>
        <Text style ={{textAlign: 'center',fontSize: 20,top :-20,left:'-20%'}}>΄Εχεις ξοδεψει το....</Text>
          <PercentageCircle textStyle={{fontSize: 15,fontWeight:'bold', color: 'black'}}   innerColor={'#92BBD9'} borderWidth={3} radius={60} percent={this.state.pososto} color={'#191970'} ></PercentageCircle>  
          <Text style ={{textAlign: 'center',fontSize: 20,top : '8%',left:'20%'}}> .... των εσοδων σου</Text>
          </View>
          </Swiper>
          {/****************************************************************************************/}
           <Text style= {[styles.title,{top: 30 }]}>Τα εξοδα και τα εσοδα σου αναλυτικα για καθε μηνα αυτον τον χρονο...</Text>
           <View   style= {styles.bar}>
           <PureChart  backgroundColor={'transparent'} width={'50%'} height={200} data={sampleData} type='bar' />
</View>
<Text style= {[styles.title,{top: -150 }]}>Τα κερδη και οι ζημιες σου αναλυτικα για καθε μηνα αυτον τον χρονο...(κανε κλικ πανω για να δεις το ποσο)</Text>
<View style= {{top: -150,left:-10 }}>
<LineChart
 onDataPointClick={({value, dataset, getColor}) => ToastAndroid.show(JSON.stringify(value) +"€",ToastAndroid.SHORT)}
  data={data1}
  width={screenWidth-8}
  height={256}
  yAxisLabel="€" 
  verticalLabelRotation={30}
  chartConfig={chartConfig}
  style={styles.bez}
  bezier
/>
</View>
        </ScrollView>
       
        
        
       
    );
  }
}
 

const styles = StyleSheet.create({
  bez:{
    right:-10
  },
  wrapper: {},
  slide1: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  bar:{
    top:150,
    height: 600,
    backgroundColor:'transparent'
  },
  main:{
    top:0,
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
  title: { 
    fontSize: 18,
    margin: 10,
    fontFamily:'monospace',
    fontStyle: 'italic',
    padding: 10
    }
  });