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
 
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 console.log(email)
  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />
      <Button
          title= "Go to register"
          onPress= {()=> props.navigation.navigate("register")}>
          
          </Button>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn}>

      <Button
          title= "SIGNIN"
          onPress= {()=> props.navigation.navigate("grouplist")}>
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