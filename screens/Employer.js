import * as React from 'react';
import { BottomNavigation, Modal, Portal, Text, Button, Provider, List, Drawer, HelperText, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet} from 'react-native';
import { CalendarList, Agenda } from 'react-native-calendars';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GiftedChat} from 'react-native-gifted-chat';
import { bgRed } from 'colorette';

export default function Employer(props){
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [mess1, setMess1] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [shifts, setShifts] = useState([]);
    var m = [];
    const [requests, setRequests] = useState([]);

    async function componentDidMount(){
        return fetch('https://api.shiftycrew.repl.co/group', {
            node: 'cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-group-id' : user_grouplink.group_id
            }
        })
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
            m = responseJson['messages']
            setLoading(false);
            setUsers(responseJson['messages'])
            console.log(responseJson['messages'])
            console.log(m)
            console.log(users)
            setShifts(responseJson['shifts'])
            setRequests(responseJson['request_offs'])
        })
        .catch((error) => {
                console.log(error)
            });
    }


    const CalendarRoute = () => <CalendarList 
    theme={{
        calendarBackground: '#34568B',
        monthTextColor: 'black',
        dayTextColor: 'white',
    }}
    horizontal={true}
    pagingEnabled={true}
    calendarWidth={800}/>;

    const ListRoute = () => 
    <View>
    <List.Section>
    <List.Subheader>Shifts</List.Subheader>
    {
                Object.values(shifts).map((item, key)=>(
                <List.Item title= {getShiftTitle(item)} key={key} style={styles.TextStyle} />)
                )}
    </List.Section>

    <List.Section>
    <List.Subheader>Request Offs</List.Subheader>
    {
                Object.values(requests).map((item, key)=>(
                <List.Item title= {getRequest(item)} key={key} style={styles.TextStyle} />)
                )}
    </List.Section>

    </View>;


    const MessagesRoute = () => 
    <View>
    <TextInput
    outlineColor="#34568B"
    //mode="outlined"
    label="Send a Message"
    placeholder="Type something"
    value={mess}
    onChangeText={(mess) => setMess(mess)}
    />
    <Button style={{marginTop: 30}} onPress={sendMessage.bind()} color={'white'}>
    <Text>Send</Text>
    </Button>
    <List.Section title="Past Messages">
        <List.Accordion
            title= "Messages"
            left={props=> <List.Icon{...props} icon="chat"/>}
            onPress={handlePress}>
            {
        console.log(users),
        Object.values(users).map((item, key)=>(
        <List.Item 
        title= {item.content} 
        key={key} 
        style={styles.TextStyle}
        right={props => <List.Icon {...props} icon= {"account-circle"} />}
        />)
        )}
            </List.Accordion>
    </List.Section>

    </View>;

    var [mess, setMess] = React.useState('');
    //const [text, setText] = React.useState('');
    //const onChangeText = mess => setMess(mess);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'calendar', title: 'Calendar', icon: 'calendar-account'},
        {key: 'messages', title: 'Messages', icon: 'chat-plus'},
        {key: 'lists', title: 'Shifts', icon: 'folder'},
    ]);
    const renderScene = BottomNavigation.SceneMap({
        calendar: CalendarRoute,
        messages: MessagesRoute,
        lists: ListRoute,
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
            padding: 50,
            margin: 10,
            justifyContent: 'center',
        },
    })

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: '#34568B',padding:20};

  const [active, setActive] = React.useState('');
  var user_grouplink = props.route.params.groupID;
  console.log(user_grouplink.group_id);

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

  async function sendMessage(){
    var sessionID = await getData('sessionKey')
    return fetch('https://api.shiftycrew.repl.co/message/send', {
        node: 'cors',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-group-id' : user_grouplink.group_id,
            'x-user-session': sessionID
        },
        body: JSON.stringify({
            'x-group-id': user_grouplink.group_id,
            'x-message-content': mess,
            'x-message-likes': 0,
            'x-message-pinned': false
         })
    })
    .then ( (response) => response.json() )
    .then ( (responseJson) => {
        props.navigation.push("employer", props.route.params)
    })
    .catch((error) => {
            console.log(error)
        });
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
    function renderPage(){
    return(
        <Provider>
            <View style={styles.container}>
            <Text>{user_grouplink.group_name}</Text>
            <Button icon="cog-outline" mode="text" onPress= {()=> props.navigation.navigate("settings", props.route.params)}>
                    Group Settings
            </Button>
            <Button mode="text" onPress= {()=> props.navigation.navigate("schedule", props.route.params)}>
                Schedule a Shift
            </Button>

        <BottomNavigation
            navigationState= {{index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
        {/* <List.Section>
        <List.Subheader>Shifts</List.Subheader>
        <List.Item title="First Shift" left={() => <List.Icon icon="folder" />} />
        <List.Item
            title="Second Shift"
            left={() => <List.Icon color="white" icon="folder" />}
        />
        </List.Section>
        <List.Section>
        <List.Subheader>Request Offs</List.Subheader>
        <List.Item title="First Request" left={() => <List.Icon icon="folder" />} />
        <List.Item
            title="Second Request"
            left={() => <List.Icon color="white" icon="folder" />}
        />
        </List.Section> */}
        
        </View>
        </Provider>
        
        );
    }

    function getShiftTitle(shiftObj){
        var timeDateStr = shiftObj['start_timedate'];
        var unixTimeStamp = timeDateStr['_seconds'];
        var timeDate = new Date(unixTimeStamp*1000);
        console.log(timeDateStr);
        console.log(timeDate);
        console.log(typeof timeDate);
        var timeDateCur = timeDate.toISOString().split('T')[0];
        var pm = timeDate.getHours() >= 12;
        var hour12 = timeDate.getHours() % 12;
        var minute = timeDate.getMinutes();
        var time = hour12 + ":" + minute + (pm ? "pm" : "am");
        var timeDateStr1 = shiftObj['end_timedate'];
        var unixTimeStamp1 = timeDateStr1['_seconds'];
        var timeDate1 = new Date(unixTimeStamp1*1000);
        var timeDateCur1 = timeDate1.toISOString().split('T')[0];
        var pm1 = timeDate1.getHours() >= 12;
        var hour121 = timeDate1.getHours() % 12;
        var minute1 = timeDate1.getMinutes();
        var time1 = hour121 + ":" + minute1 + (pm1 ? "pm" : "am");
        var person = shiftObj['assigned_user'];

        var title = 'Shift from ' + time + "-" + time1 + " on " + timeDateCur + " for " + person;
        return title;
    }

    function getRequest(requestObj){
        var timeDateStr = requestObj['start_timedate'];
        var unixTimeStamp = timeDateStr['_seconds'];
        var timeDate = new Date(unixTimeStamp*1000);
        console.log(timeDateStr);
        console.log(timeDate);
        console.log(typeof timeDate);
        var timeDateCur = timeDate.toISOString().split('T')[0];
        var pm = timeDate.getHours() >= 12;
        var hour12 = timeDate.getHours() % 12;
        var minute = timeDate.getMinutes();
        var time = hour12 + ":" + minute + (pm ? "pm" : "am");
        var timeDateStr1 = requestObj['end_timedate'];
        var unixTimeStamp1 = timeDateStr1['_seconds'];
        var timeDate1 = new Date(unixTimeStamp1*1000);
        var timeDateCur1 = timeDate1.toISOString().split('T')[0];
        var pm1 = timeDate1.getHours() >= 12;
        var hour121 = timeDate1.getHours() % 12;
        var minute1 = timeDate1.getMinutes();
        var time1 = hour121 + ":" + minute1 + (pm1 ? "pm" : "am");
        var person = requestObj['user'];

        var title = person + ' has requested off from ' + time + " on " + timeDateCur + " to " + time1 + " on " + timeDateCur1;
        return title;
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return(isLoading ? loadingPage() : renderPage());
}