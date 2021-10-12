// import * as React from 'react';
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { TouchableOpacity, View, StyleSheet } from 'react-native';
// import {
//     Button,
//     HelperText,
//     TextInput,
//     Provider as PaperProvider,
// } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  //Button,
  TouchableOpacity,
} from "react-native";
import {
    Button,
    HelperText,
    Provider as PaperProvider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OpeningPage(props){

    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: 'white',
            padding: 20,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const storeData = async (key, value) => {
    try {
    await AsyncStorage.setItem(key, value)
    } catch (e) {
    // saving error
    }
  }
var isLoggedIn = true;

const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
        isLoggedIn = true;
      }
    } catch(e) {
      // error reading value
    }
  }
    
    const hasErrors = () => {
        return !user.includes('@');
    };

    function componentDidMount(){
        if(hasErrors){
            return false
        }
        return fetch('https://api.shiftycrew.repl.co/signup', {
            node: 'cors',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               'x-user-username' : email,
               'x-user-password' : password,
            })
        })
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
    
                console.log(responseJson.result)
                if(responseJson.result){
                    storeData('sessionKey', responseJson.session_id)
                    storeData('isLoggedIn', true)
                    console.log(getData('isLoggedIn'))
                    props.navigation.navigate("groups")
                } else {
                    storeData('isLoggedIn', false)
                    storeData('sessionKey', null)
                    setErrors(true)
                    console.log("has errors" + errors)
                }
                
            })
        .catch((error) => {
                console.log(error)
            });
    }
        
       async function isLoggedIn(){
           if(getData('isLoggedIn'))
            props.navigation.navigate("groups")
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
            <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
            />
            <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

            <Button color="#34568B" icon="account-check-outline" mode="contained" onPress= {{componentDidMount}}>
               SIGNUP!
            </Button>
        
            </View>
        </PaperProvider>
    );
}