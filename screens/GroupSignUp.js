import React, { useState } from "react";
import {
  StyleSheet,
  View,
  //TextInput,
  //Button,
  TouchableOpacity,
} from "react-native";
import {
    Button,
    TextInput,
    Provider as PaperProvider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';


export default function GroupSignUp(props){

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
        textInput: {
                height: 50,
                flex: 1,
                padding: 10,
                marginLeft: 20,
        },
    })


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [organizationName, setOrg] = useState("");


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
       console.log(value);
       return value;
      }
    } catch(e) {
      console.log(e);
    }
  }

    async function componentDidMount(){
        var sessionID = await getData('sessionKey')
        console.log(sessionID)
        return fetch('https://api.shiftycrew.repl.co/create/group', {
            node: 'cors',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-user-session': sessionID
            },
            body: JSON.stringify({
               'x-group-name' : name,
               'x-group-description' : description,
               'x-group-organization_name' : organizationName
            })
        })
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
                    //console.log(getData('isLoggedIn'))
                    setErrors(true)
                    props.navigation.push("groups")
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
          placeholder="Group Name."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
            />
            <TextInput
          //style={styles.textInput}
          placeholder="Group Description."
          placeholderTextColor="#003f5c"
          onChangeText={(description) => setDescription(description)}
          />
            <TextInput
          //style={styles.textInput}
          placeholder="Group Organization."
          placeholderTextColor="#003f5c"
          onChangeText={(organizationName) => setOrg(organizationName)}
            />

            <Button color="#34568B" icon="account-check-outline" mode="contained" onPress= {componentDidMount}>
               CREATE GROUP!
            </Button>

            </View>
        </PaperProvider>
    );
}