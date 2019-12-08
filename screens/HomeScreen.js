import * as WebBrowser from 'expo-web-browser';
import {useState,useEffect} from 'react';
import React from 'react';
import {Button, Dimensions} from 'react-native';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { MonoText } from '../components/StyledText';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import Prompt from 'rn-prompt';


export default function HomeScreen() {  
  //const getBalance = () => {} // get from firebase
  const [pr, setPr] = useState(false);
  const [pr1, setPr1] = useState(false);
  const [balance,setBalance] = useState(1000);  
  const modelData = {
      labels: ['I4: Milk', 'I7: Bread', 'I12: Coke', 'I42: 5-Star', 'I6: Silk'],
      datasets: [
        {
          data: [62, 45, 92, 80, 52],
        },
      ],
    };

  const handleBal = () => {
    setPr(true)
  }
  const handleWith = () => {
     setPr1(true)
  }

  const sendToDb = () => {
  }

  const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};

const modData = [
   {
    name: "Milk",
    demand: 62,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Bread",
    demand:45,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Coke",
    demand: 92,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "5-star",
    demand: 80,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Silk",
    demand: 52,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
]

  return (
    <ImageBackground source={require('../assets/images/background_t.jpg')} style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>  
        <View>
        <View style={styles.welcomeContainer}>
          {/*<Image
            source={
              require('../assets/images/icon.png')
            }
            style={styles.welcomeImage}
          />*/
          }
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>FoodTree Vendor Home</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={styles.bigBalance}>{"\n"} Seeds Balance{"\n\n\n\n"}
            <Text style={styles.balanceNumber}> {balance} </Text>
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleBal} underlayColor='#99ff99'>
              <Text textAlign='center' style={{color: 'black'}}>Add Seed Balance</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleWith} underlayColor='#99ff99'>
              <Text textAlign='center' style={{color: 'black'}}>Withdraw Seed Balance</Text>
            </TouchableOpacity>
        </View>
        <ScrollView styles={styles.analysisContainer}>
          <Text style={styles.getStartedText}>{"\n\n"} Item analysis {"\n"}   </Text> 
          <Text style={styles.getStartedText}> Average Sales Forecasted </Text>
          <View>
                      <LineChart
                        data={modelData}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel={''}
                        chartConfig={{
                          backgroundColor: '#e26a00',
                          backgroundGradientFrom: '#fb8c00',
                          backgroundGradientTo: '#ffa726',
                          decimalPlaces: 1, // optional, defaults to 2dp
                          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          style: {
                            borderRadius: 16
                          }
                        }}
                        bezier
                        style={{
                          marginVertical: 8,
                          borderRadius: 16
                        }}
                      />
                    </View>
                          <Text style={styles.getStartedText}>{"\n"} Item demand forecasted </Text>
                <View>
                <PieChart
                        data={modData}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="demand"
                        backgroundColor='transparent'
                        paddingLeft='15'
                        absolute
                      />
                </View>
          <Text style={styles.getStartedText1}> {"\n"} <Text style = {{fontWeight:'bold'}}>Item in demand: Item 12 </Text></Text>
          <Text style={styles.getStartedText1}> {"\n"} <Text style = {{fontWeight:'bold'}}>Item not in demand: Item 7{"\n"} </Text></Text>

        </ScrollView>
        </View>
      </ScrollView>
      <Prompt
            visible={pr}
            title="Enter Amount"
            placeholder="Type Something"
            onCancel={() => {setPr(true)}}
            onSubmit={ (amt) => {
              setBalance(s=>{return +amt+s})
              alert("Added!")
              setPr(false)
              sendToDb(amt)
            }
            }
    />
    <Prompt
            visible={pr1}
            title="Enter Amount"
            placeholder="Type Something"
            onCancel={() => {setPr(true)}}
            onSubmit={ (amt) => {
              setBalance(s=>{return -amt+s})
              alert("Sent!")
              setPr1(false)
              sendToDb(amt)
            }
            }
    />
    </ImageBackground>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  balanceContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  analysisContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50
  },
  bigBalance: {
    marginBottom: 20,
    color: '#000066',
    textShadowColor:'#e6ffe6',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:5,
    fontSize: 32,
    lineHeight: 15,
    textAlign: 'center',
    padding:20
  },
  balanceNumber: {
    color: '#000066',
    fontFamily: 'monospace',
    fontSize: 44,
    textAlign: 'center',
    textShadowColor:'#e6ffe6',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:5,
    padding:10
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  analysisContainer: {
    padding:25
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  button1Container: {
    marginTop:5,
    height:25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:10,
    backgroundColor: "#ba1206",
  },
  buttonContainer: {
    alignItems:'center',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000066',
    lineHeight: 24,
    textAlign: 'center',
  },
  getStartedText1: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000006',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: '#000066',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
   button: {
    backgroundColor: '#d9d9d9',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#336633',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
    width: 250,
    alignItems: 'center',
   }
});
