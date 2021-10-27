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
  //TextInput,
  //Button,
  TouchableOpacity,
} from "react-native";
import {
    Button,
    HelperText,
    TextInput,
    Provider as PaperProvider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';


export default function OpeningPage(props){

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
            // flex:1,
            // backgroundColor: 'white',
            // padding: 20,
            // margin: 10,
            // alignItems: 'center',
            // justifyContent: 'center',
        },
        inputView: {
                backgroundColor: "#FFC0CB",
                borderRadius: 30,
                width: "70%",
                height: 45,
                marginBottom: 20,
                alignItems: "center",
        },
        textInput: {
                height: 50,
                flex: 1,
                padding: 10,
                marginLeft: 20,
        },
    })


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setNumber] = useState("");
  const [date, setDate] = useState("");

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const showDatePicker = () => {
//       setDatePickerVisibility(true);
//   };
//   const hideDatePicker = () => {
//       setDatePickerVisibility(false);
//   };
//   const handleConfirm = (date) => {
//       console.warn("A date has been picked: ", date);
//       hideDatePicker();
//   };

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
        return false;
    };

    function componentDidMount(){
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
               'x-user-phone_number' : phone,
               'x-user-first_name' : firstName,
               'x-user-last_name' : lastName,
               'x-user-dob' : date,
            })
        })
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
                console.log("asdfsa" + responseJson.result)
                    storeData('sessionKey', responseJson.session_id)
                    storeData('isLoggedIn', true)
                    //console.log(getData('isLoggedIn'))
                    setErrors(true)
                    props.navigation.navigate("groups")
                }
            )
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
          //style={styles.textInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
            />
            <TextInput
          //style={styles.textInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          />
            <TextInput
          //style={styles.textInput}
          placeholder="First Name."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(firstName) => setFirst(firstName)}
            />
        <TextInput
          //style={styles.TextInput}
          placeholder="Last Name."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(lastName) => setLast(lastName)}
            />
        <TextInput
          //style={styles.TextInput}
          placeholder="Phone Number."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(phone) => setNumber(phone)}
        />
        <TextInput
          //style={styles.TextInput}
          placeholder="Date of Birth."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(date) => setDate(date)}
        />
        
        {/* <Button title="show date picker" onPress={showDatePicker} />
        <DateTimerPickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        /> */}

            <Button color="#34568B" icon="account-check-outline" mode="contained" onPress= {componentDidMount}>
               SIGNUP!
            </Button>

            </View>
        </PaperProvider>
    );
}