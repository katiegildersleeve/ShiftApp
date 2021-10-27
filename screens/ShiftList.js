import * as React from 'react';
import { BottomNavigation, Modal, Portal, Text, Button, Provider, List, Drawer, HelperText, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet} from 'react-native';
import { CalendarList, Agenda } from 'react-native-calendars';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShiftList(props){
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [mess1, setMess1] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [shifts, setShifts] = useState([]);
    var m = [];
    const [requests, setRequests] = useState([]);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
            padding: 50,
            margin: 10,
            justifyContent: 'center',
        },
    })

    useEffect(() => {
        componentDidMount();
    }, []);

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

    return(
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

    </View>
    );
}