import React, { Component, useState, useEffect } from 'react'
import { ScrollView, 
  StyleSheet, 
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground,
BackHandler} from 'react-native';
import t from 'tcomb-form-native';
import { withNavigation } from 'react-navigation';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
 

const Form = t.form.Form;
  const item = t.struct({
    userId: t.String,
    itemName: t.Number,
    itemPrice: t.Number,
    itemSubscriptionDuration: t.Number,
    itemSubscriptionPrice: t.Number,
    itemRewardSeeds: t.Number
  });

 const options = {}

export default class SubScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        uid: '',
        itemName: '',
        itemPrice: '',
        itemSubscriptionDuration: '',
        itemSubscriptionPrice: '',
        itemRewardSeeds: ''
      }
    }
    //alert(props.navigation.getParam("uid"));
   }
   componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate("Links")
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  } 

handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); 
      alert("Subscription Successfully added!");
      this.props.navigation.navigate('Links');
    }
  }
  render() {
  return (
    <ImageBackground source={require('../assets/images/background_t.jpg')} style={styles.wrapper}>
      <View style={styles.scrollViewWrapper}>
          <Form
            ref="form"
            type={item}
            options={options}
            value={this.state.value}
          />
          <View justifyContent='center' alignItems='center'>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
              <Text textAlign='center' style={{color: 'black'}}>Add subscription</Text>
            </TouchableOpacity>
          </View>
    </View> 
      </ImageBackground>
      );
  }
}

const styles = StyleSheet.create({
  Regcontainer: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ccff99',
    alignItems: 'center'
  },
  RegbuttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
  Regbutton: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  wrapper: {
    display: "flex",
    flex: 1,
    width: '100%', 
    height: '100%'
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
    padding:20,
    backgroundColor: 'transparent'
  },
  loginHeader: {
    fontSize: 22,
    color: 'brown',
    fontWeight: "300",
    marginBottom: 40,
    textAlign: 'center'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
    marginTop: 3,
    marginLeft: -10,
    marginBottom: 20
  },
  button1: {
    backgroundColor: '#ff3333',
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
   button: {
    marginBottom: 20,  
    width: '85%',  
    height: 45,
    alignItems: 'center',   
     backgroundColor: '#d9d9d9',
     borderColor: '#336633',
     justifyContent: 'center',
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
 });