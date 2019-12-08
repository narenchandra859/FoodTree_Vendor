import React,{useContext} from 'react';
import { View,ScrollView, Text, Image, StyleSheet, ImageBackground, BackHandler} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {Linking} from 'react-native'
import { withNavigation } from 'react-navigation';

import {Global} from '../App';

const transactions = [
 {
 	tid: 'ABCD_1234',
 	amount: 100,
 	uid: 'BLR-4567',
 	type: 'Offer'
 },
 {
 	tid: 'ABCD_1234',
 	amount: 100,
 	uid: 'BLR-4567',
 	type: 'Offer'
 },
 {
 	tid: 'ABCD_1234',
 	amount: 100,
 	uid: 'BLR-4567',
 	type: 'Offer'
 },
 {
 	tid: 'ABCD_1234',
 	amount: 100,
 	uid: 'BLR-4567',
 	type: 'Offer'
 },
 {
 	tid: 'ABCD_1234',
 	amount: 100,
 	uid: 'BLR-4567',
 	type: 'Offer'
 },
]

const X=(props)=>{
	const {VendorTransactions,Users,Vendors}=useContext(Global);
	console.log(VendorTransactions)
	return	(<Card containerStyle={{padding: 0}} style={styles.cards}>
			    {Object.keys(VendorTransactions).map((u, i) => {
			      return (
			        <ListItem
			          key={i}
			          roundAvatar
			          title={'Type:'+VendorTransactions[u].type}
			          subtitle={
			          	<View>
			          		<Text style={{color:'brown', fontSize:16}}>Time:{new Date(VendorTransactions[u].time).toGMTString()}  {VendorTransactions[u].seeds &&('\n'+'seeds : '+VendorTransactions[u].seeds)} </Text>
			          	</View>
			          }
			          bottomDivider
			          leftIcon={{ name: 'check-circle' }}
			        />
			      );
			    })
			  }

	</Card>)
}


export default class TransactionScreen extends React.Component {

	constructor(props) {
    super(props);
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
	render() {
	return(
		<ImageBackground source={require('../assets/images/background_t.jpg')} style={styles.container}>
  <ScrollView style={styles.wrapper}>
		<X />
	</ScrollView>
	</ImageBackground>
	);
	}
}

const styles= StyleSheet.create({
	wrapper: {
		flex:1,
		paddingTop: 50,
		padding:15
	},
	container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
	cards: {
		marginLeft: 5,
		marginRight:5,
		height: 100
	}
});
