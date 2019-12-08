
import React,{useEffect,useState,useCallback} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
const config = {
  apiKey: "AIzaSyDQFKlTXMBjrhdcL_Au2Y9f98QLZtChQMI",
  authDomain: "rakshith-r.firebaseapp.com",
  databaseURL: "https://rakshith-r.firebaseio.com",
  projectId: "rakshith-r",
  storageBucket: "rakshith-r.appspot.com",
  messagingSenderId: "438179282894",
};

const firebaseApp = firebase.initializeApp(config);
const db=firebaseApp.database();


export default function useGlobal() {
  const [Offers,setOffers]=useState({});
  const [Subscriptions,setSubscriptions]=useState({});
  const [Vendors,setVendors]=useState({});
  const [Transactions,setTransactions]=useState({});
  const [VendorTransactions,setVendorTransactions]=useState({});
  var database = db;
  useEffect(()=>{
  database.ref('Offers/').on('value',(snapshot)=>{
    setOffers(snapshot.val());
  })
  database.ref('Subscription/').on('value',(snapshot)=>{
    setSubscriptions(snapshot.val());
  })
  database.ref('Vendors/').on('value',snapshot=>{
    setVendors(snapshot.val());
    console.log('called',snapshot.val());
    // setVendors({});
  })
  database.ref('Transactions/').on('value',snapshot=>{
    setTransactions(snapshot.val());
  })
  database.ref('Vendortransactions/').on('value',snapshot=>{
  	setVendorTransactions(snapshot.val());
  	console.log(snapshot.val())
  })
},[])
  const addItem=useCallback((item)=>{
  	console.log(item,database);
  	const o={
  		...Offers,
  		['894032_'+(new Date().getTime())]:{
    itemName: item.itemName,
    price: item.itemPrice,
    discount : item.itemDiscount,
    endTime:new Date().getTime(),
    vid:894032

  }
  	}
  	console.log(o)
  	database.ref('Offers/').set(o);



  })

  return {
    Offers,
    Subscriptions,
    Vendors,
    Transactions,
    VendorTransactions,
    addItem
  }
};