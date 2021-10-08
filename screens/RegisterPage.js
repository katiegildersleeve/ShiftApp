import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
    Button,
    HelperText,
    TextInput,
    Provider as PaperProvider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OpeningPage(props){

    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: 'black',
            padding: 20,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const onChangeUser = user => setUser(user);
    const onChangePass = pass => setPass(pass);
    
    const hasErrors = () => {
        return !user.includes('@');
    };
    return (
        <PaperProvider>
            <View style={styles.container}>
            <TextInput label="Email" value={user} onChangeText={onChangeUser}/>
            {/* <HelperText type="error" visible={hasErrors()}>
                Email address is invalid!
            </HelperText> */}
            <TextInput label="Password" value={pass} onChangeText={onChangePass}/>
            <Button color= "#34568B" icon="account-check-outline" mode="contained" onPress= {()=> props.navigation.navigate("groups")}>
                SIGNUP!
            </Button>
            </View>
        </PaperProvider>
    );
}