import React,  { Component } from 'react';
import { ScrollView, StyleSheet, View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { withNavigation } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';

export default function LinksScreen()  {
  const { navigate } = useNavigation();
  return (
    <ImageBackground source={require('../assets/images/background_t.jpg')} style={styles.container}>
      <View style={styles.container}>
        <Text textAlign='center' style={{fontSize:24, fontWeight:'bold'}}> Functions {"\n\n"}</Text>
         <TouchableOpacity onPress={() => navigate('Test')} style={styles.button}>
            <Text style={styles.textStyle}> Add Item 
            </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigate('QRCode')} style={styles.button}>
            <Text style={styles.textStyle}> Scan QR Code
            </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigate('Seeds')} style={styles.button}>
            <Text style={styles.textStyle}> Send Seeds
            </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigate('Subs')} style={styles.button}>
            <Text style={styles.textStyle}> Add subscription
            </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigate('Transaction')} style={styles.button}>
            <Text style={styles.textStyle}> Transaction History
            </Text>
         </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

LinksScreen.navigationOptions = {
 header:null
};

const styles = StyleSheet.create({
  buttonStyle:{
    alignItems:'center',
    backgroundColor: '#F92660',
    width:150,
    height:50,
    marginTop:20,
    marginBottom:10,
    marginRight:15,
    padding:5,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width:150,
    height:50,
    marginTop:20,
    marginBottom:10,
    marginRight:15,
    padding:5,
  },
  button: {
  marginBottom: 30,  
  width: '85%',  
  height: 65,
  alignItems: 'center',   
   backgroundColor: '#d9d9d9',
   borderColor: '#336633',
   justifyContent: 'center',
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
  },
  button1: {
    backgroundColor: '#99ff99',
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
   },
  textStyle: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
});
