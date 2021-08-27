import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from 'firebase/app'

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCV3NnGZvy7HoNklm7Q44XTjP3b8AscPts",
  authDomain: "shift-app-ecf56.firebaseapp.com",
  projectId: "shift-app-ecf56",
  storageBucket: "shift-app-ecf56.appspot.com",
  messagingSenderId: "808624554641",
  appId: "1:808624554641:web:ece0ea123f3cb22576b530",
  measurementId: "G-NFL6LPZRDW"
};

firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>);
}

const styles = StyleSheet.create({
  child: {
    backgroundColor: 'white',
    padding: 10,
  },
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
