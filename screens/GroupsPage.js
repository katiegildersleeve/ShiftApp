import * as React from 'react';
import{TextInput, DefaultTheme, List, Modal, Portal, Text, Button, Provider, Provider as PaperProvider,} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function GroupsPage(props){
    const theme = {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: '#66CDAA',
            accent: '#87CEFA',
            background: 'white',
            backgrop: 'white',

        },
    };
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: '#34568B',padding:20};
    const [text,setText] = useState("");
    var waited = false;
    const [isLoading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    //const [text, setText] = React.useState('');

    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#34568B',
            padding: 20,
            margin: 10,
        },
    })

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

      async function componentDidMount(){
        var sessionID = await getData('sessionKey')
        console.log(sessionID)
        return fetch('https://api.shiftycrew.repl.co/user', {
            node: 'cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-user-session': sessionID
            }
        })
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
            setLoading(false);
                if(responseJson.auth_error){
                    storeData("isLoggedIn", false)
                    props.navigation.navigate("signin")
                } else {
                    console.log(responseJson)
                    storeData('myUsername', responseJson['email'])
                    console.log(responseJson['groups'])
                    setGroups(responseJson['groups'])
                    //user = JSON.parse(responseJson)
                    //groups = user["groups"]
                    console.log(groups)
                    console.log(groups[0])
                    //console.log(groups)
                }
                console.log("asdas" + responseJson)
            })
        .catch((error) => {
                console.log(error)
            });
    }

    async function joinCodeFetch(){
        var sessionID = await getData('sessionKey')
        console.log(sessionID)
        return fetch('https://api.shiftycrew.repl.co/join/group', {
            node: 'cors',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-user-session': sessionID
            },
            body: JSON.stringify({
               'x-group-join_code': text
            })
        })
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
            props.navigation.push("groups")
            })
        .catch((error) => {
                console.log(error)
            });
    }

    function renderPage() {
        return (
            <PaperProvider>
                 {/* theme={theme}>  */}
                <View style={styles.container}>
    
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <TextInput
                        label="Insert Group Code"
                        value={text}
                        onChangeText={text => setText(text)}
                        />
                        <Button style={{marginTop:30}} onPress= {joinCodeFetch.bind()}> 
                            <Text>Join This Group</Text>
                        </Button>
                    </Modal>
                </Portal>
                <Button color= "black" style={{marginTop:30}} onPress={showModal}>
                    <Text>Join a Group</Text>
                </Button>
                <List.Section title="Accordion">
                    <List.Accordion
                        title="My Groups"
                        
                        left={props=> <List.Icon{...props} icon="folder"/>}
                        // expanded={expanded}
                        onPress={handlePress}>
                {
                Object.values(groups).map((item, key)=>(
                <List.Item title= {item.group_name} key={key} style={styles.TextStyle} onPress = {item.user_role == "user" ? ()=> props.navigation.navigate("main", {groupID: item}) : ()=> props.navigation.navigate("employer", {groupID: item})}/>)
                )}
    
                        {/* <List.Item title="Group 1" onPress= {()=> props.navigation.navigate("main")}/>
                        <List.Item title="Group 2" onPress= {()=> props.navigation.navigate("main")}/> */}
                    </List.Accordion>
                </List.Section>
                
                <Button icon="plus" mode="text" onPress= {()=> props.navigation.navigate("groupsignup")}>
                    Create new Group
                </Button>
    
                </View>
            </PaperProvider>
        );
    }

    function loadingPage(){
        return(
        <PaperProvider>
            <View>
                <Text>Loading page...</Text>
            </View>
        </PaperProvider>
        );
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return(
        isLoading ? loadingPage() : renderPage()
    )
};