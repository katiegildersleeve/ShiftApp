import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import OpeningPage from './screens/OpeningPage';
import RegisterPage from './screens/RegisterPage';
import GroupsPage from './screens/GroupsPage';
import MainScreen from './screens/MainScreen';
import Employer from './screens/Employer';
import Employee from './screens/Employee';
import Ag from './screens/Ag';


const Stack = createNativeStackNavigator();

const theme = {
  roundness: 3,
  colors: {
    primary: '#34568B',
    accent: 'white',
    background: 'white',
    text: 'black',
    backdrop: '#34568B',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
     <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="login" component={OpeningPage} />
         <Stack.Screen name="register" component={RegisterPage} />
         <Stack.Screen name="groups" component={GroupsPage} />
         <Stack.Screen name="main" component={MainScreen} />
         <Stack.Screen name="employee" component={Employee} />
         <Stack.Screen name="employer" component={Employer} />
         <Stack.Screen name="agenda" component={Ag} />
       </Stack.Navigator>
     </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Login from './screens/Login';
// import Register from './screens/Register';
// import MainScreen from './screens/MainScreen';
// import Groups from './screens/Groups';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import firebase from 'firebase/app'

// // Optionally import the services that you want to use
// //import "firebase/auth";
// //import "firebase/database";
// //import "firebase/firestore";
// //import "firebase/functions";
// //import "firebase/storage";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCV3NnGZvy7HoNklm7Q44XTjP3b8AscPts",
//   authDomain: "shift-app-ecf56.firebaseapp.com",
//   projectId: "shift-app-ecf56",
//   storageBucket: "shift-app-ecf56.appspot.com",
//   messagingSenderId: "808624554641",
//   appId: "1:808624554641:web:ece0ea123f3cb22576b530",
//   measurementId: "G-NFL6LPZRDW"
// };

// firebase.initializeApp(firebaseConfig);

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="login" component={Login} />
//         <Stack.Screen name="register" component={Register} />
//         <Stack.Screen name="calendar" component={MainScreen} />
//         <Stack.Screen name="grouplist" component={Groups} />
//       </Stack.Navigator>
//     </NavigationContainer>);
// }

// const styles = StyleSheet.create({
//   child: {
//     backgroundColor: 'white',
//     padding: 10,
//   },
//   container: {
//     padding: 50,
//     flex: 1,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
