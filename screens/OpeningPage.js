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
 
export default function App(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

function componentDidMount(){
    return fetch('https://api.shiftycrew.repl.co', {
        node: 'cors',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application.json',
            "random": 123
        }
    })
    .then ( (response) => response.json() )
    .then ( (responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson.movies,
            })
            
        })
    .catch((error) => {
            console.log(error)
        });
}
    
    componentDidMount();
  return (
    <View style={styles.container}>
 
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
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <Button color="#34568B" icon="account-check-outline" mode="contained" onPress= {()=> props.navigation.navigate("groups")}>
         SIGNIN!
      </Button>
    </View>
  );
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

// //import * as React from "react";
// import 'react-native-gesture-handler';
// import {
//     Button,
//     TextInput,
//     Provider as PaperProvider,
// } from 'react-native-paper';
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";

//         export default function OpeningPage(){
//             const [user, setUser] = useState("");
//             const [password, setPassword] = useState("");
//         return(
//             <View>
//                 <TextInput
//                 placeholder="Username"
//                 onChangeText={(user) => setUser(user)}
//                 />
//                 <TextInput
//                 placeholder="Password"
//                 secureTextEntry={true}
//                 onChangeText={(password) => setPassword(password)}
//                 />
            
//             <TouchableOpacity>
//                 <Text>Forgot Password?</Text>
//             </TouchableOpacity>
//             </View>
//         );
//         }
// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         backgroundColor: 'white',
//         padding: 20,
//         margin: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// })

// // const hasErrors = () => {
// //     return !user.includes('@');
// // };

// function Login() {
//     const [user, setUser] = React.useState('');
//     const [pass, setPass] = React.useState('');
//     const onChangeUser = user => setUser(user);
//     const onChangePass = pass => setPass(pass);
//     return(
//         <PaperProvider>
//             <View style={styles.container}>
//             <Button color="#34568B" icon="account-outline" mode="contained" onPress= {()=> props.navigation.navigate("register")}>
//                 Don't have an account yet?
//             </Button>
//             {movies}
            
//             <TextInput label="Email" value={user} onChangeText={onChangeUser}/>
//             {/* <HelperText type="error" visible={hasErrors()}>
//                 Email address is invalid!
//             </HelperText> */}
//             <TextInput secureTextEntry={true} label="Password" value={pass} onChangeText={onChangePass}/>
//             <Button color="#34568B" icon="account-check-outline" mode="contained" onPress= {()=> props.navigation.navigate("groups")}>
//                 SIGNIN!
//             </Button>
//             </View>
//         </PaperProvider>
//     )
// }

// export default class OpeningPage extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log("adfasd");
//         this.state = {
//             isLoading: true,
//             dataSource: null,
//         }
//     }

//     componentDidMount () {
//         return fetch('https://api.shiftycrew.repl.co', {
//             node: 'cors',
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application.json',
//                 "random": 123
//             }
//         })
//             .then ( (response) => response.json() )
//             .then ( (responseJson) => {
//                 this.setState({
//                     isLoading: false,
//                     dataSource: responseJson.movies,
//                 })
                
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
//     }

//     render() {
//         if(this.state.isLoading){
//             return (
//                 <View style={styles.constainer}>
//                     <ActivityIndicator />
//                 </View>
//             )
//         } else {
//             let movies = this.state.dataSource.map((val, key) => {
//                 return <View key={key} style={styles.container}>
//                     <Text>{val.title}</Text>
//                </View>
//             });
//             return Login();

//                 // <PaperProvider>
//                 //     <View style={styles.container}>
//                 //     <Button color="#34568B" icon="account-outline" mode="contained" onPress= {()=> props.navigation.navigate("register")}>
//                 //         Don't have an account yet?
//                 //     </Button>
//                 //     {movies}
                    
//                 //     <TextInput label="Email" value={user} onChangeText={onChangeUser}/>
//                 //     {/* <HelperText type="error" visible={hasErrors()}>
//                 //         Email address is invalid!
//                 //     </HelperText> */}
//                 //     <TextInput secureTextEntry={true} label="Password" value={pass} onChangeText={onChangePass}/>
//                 //     <Button color="#34568B" icon="account-check-outline" mode="contained" onPress= {()=> props.navigation.navigate("groups")}>
//                 //         SIGNIN!
//                 //     </Button>
//                 //     </View>
//                 // </PaperProvider>
            
//         }
//     }
// 