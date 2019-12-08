import React, { Component, useState, useEffect } from 'react'
import { ScrollView, 
  StyleSheet, 
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground, BackHandler} from 'react-native';
import t from 'tcomb-form-native';
import { withNavigation } from 'react-navigation';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const offers = [
 {
    name: 'Milk (10% Discount)',
    avatar: require("../assets/images/icon.png"),
    num: 1,
    mrp: 20,
    dsc: 5
 },
 {
    name: 'Bread (15% Discount)',
    avatar: require("../assets/images/icon.png"),
    num: 2,
    mrp: 50,
    dsc: 5
 },
 {
    name: 'Apples (20% Discount)',
    avatar: require("../assets/images/icon.png"),
    num: 3,
    mrp: 100,
    dsc: 5
 },
 {
  name: 'Onions (30% Discount)',
  avatar: require("../assets/images/icon.png"),
  num: 4,
  mrp: 300,
  dsc: 90
},
]

const Form = t.form.Form;
  const item = t.struct({
    uid: t.String,
    offerNum: t.Number,
    offerMrp: t.Number,
    offerDiscount: t.Number,
  });

 const options = {}

export default class SeedScreen extends React.Component {
	constructor(props) {
    super(props);
   	this.state = {
   		value: {
   		uid: props.navigation.getParam("uid"),
   		offerNum: "",
   		offerMrp: "",
   		offerDiscount: ""
   	  }
   	}
   	//alert(props.navigation.getParam("uid"));
   	console.log(this.props.navigation.getParam("uid"));
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
      alert("Successfully sent!");
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
	    <ScrollView>
		  <Card containerStyle={{padding: 0}} >
				  {
				    offers.map((u, i) => {
				      return (<View key={i}>
				        <ListItem
				          key={i}
				          roundAvatar
				          title={u.name}
				          leftAvatar={{source: require("../assets/images/icon.png")}}
				        />
				        <Button
						    icon={<Icon name='forward' color='#ffffff' />}
						    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
						    title='Apply Offer'
						    onPress={() => {
						    	this.setState({value: { uid: this.props.navigation.getParam("uid"), offerNum: u.num, offerMrp: u.mrp, offerDiscount: u.dsc}})
						    }} />
						</View>
				      );
				    })
				  }
		  </Card>
		</ScrollView>
    <View justifyContent='center' alignItems='center'>
		        <TouchableOpacity style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
		          <Text textAlign='center' style={{color: 'black'}}>Send Seeds</Text>
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
    padding:20
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
    backgroundColor: '#DDDDDD',
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
 });