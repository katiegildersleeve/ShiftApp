import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function Request(props) {

    const storeData = async (key, value) => {
        try {
        await AsyncStorage.setItem(key, value)
        } catch (e) {
        // saving error
        }
      }
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
    
    var user_grouplink = props.route.params.groupID;
    async function componentDidMount(){
        var sessionID = await getData('sessionKey')
        return fetch('https://api.shiftycrew.repl.co/create/request_off', {
            node: 'cors',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-user-session': sessionID,
            },
            body: JSON.stringify({
               'x-group-id' : user_grouplink.group_id,
               'x-off-start_date' : startDate,
               'x-off-start_time' : startTime,
               'x-off-end_date' : endDate,
               'x-off-end_time' : endTime,
               'x-off-note' : note,
            })
        })
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
    
            props.navigation.navigate("main", props.route.params)
                
            })
        .catch((error) => {
                console.log(error)
            });
    }
        
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Start Date (MM/DD/YYYY)."
          placeholderTextColor="white"
          onChangeText={(startDate) => setStartDate(startDate)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Start Time (_ _ : _ _)."
          placeholderTextColor="white"
          onChangeText={(startTime) => setStartTime(startTime)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="End Date (MM/DD/YYYY)."
          placeholderTextColor="white"
          onChangeText={(endDate) => setEndDate(endDate)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="End Time (_ _ : _ _)."
          placeholderTextColor="white"
          onChangeText={(endTime) => setEndTime(endTime)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Add a note here."
          placeholderTextColor="white"
          onChangeText={(note) => setNote(note)}
        />
      </View>

 
      <TouchableOpacity style={styles.container}>

      <Button
          title= "Submit Request"
          onPress = {componentDidMount.bind()}
          >
        
      </Button>

        {/* { <Text style={styles.loginText}>LOGIN</Text> } */}
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0C4DE",
    alignItems: "center",
    justifyContent: "center",
  },
 

 
  inputView: {
    backgroundColor: "#0000CD",
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
  }, })