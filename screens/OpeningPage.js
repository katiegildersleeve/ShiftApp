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
 
export default function App(props) {
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
  

function componentDidMount(){
    return fetch('https://api.shiftycrew.repl.co/signin', {
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
    
console.log("help:" + isLoggedIn)
if(isLoggedIn == false) {
  return (
    <PaperProvider>
    <View style={styles.container}>
        <Button color="#34568B" icon="account-outline" mode="contained" onPress= {()=> props.navigation.navigate("register")}>
                Don't have an account yet?
        </Button>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>     
        <Button color="#34568B" icon="account-check-outline" mode="contained" onPress= {componentDidMount} >
            SIGNIN!
        </Button>
        {errors ? <Text>Email address or password is invalid</Text> : null}
    </View>
</PaperProvider>
  );
} else { 
    return (
        <PaperProvider>
         <View style={styles.container}>
         <Button color="#34568B" icon="account-outline" mode="contained" onPress= {()=> props.navigation.navigate("groups")}>
                 GO TO GROUPS
         </Button>
        </View>
        </PaperProvider>
    )
    }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
})