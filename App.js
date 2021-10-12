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