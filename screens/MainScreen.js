import * as React from 'react';
import { Modal, Portal, Text, Provider, List, Provider as PaperProvider } from 'react-native-paper';
import {CalendarList } from 'react-native-calendars';
import { View, StyleSheet, Button, Platform } from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainGroup(props){
    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#34568B',
            padding: 20,
            margin: 10,
        },
    })
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'red', padding: 20};
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    var user_grouplink = props.route.params.groupID;
    console.log(user_grouplink.group_id);
    var groupObj = React.useState('');
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

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
            setLoading(false);
            groupObj = responseJson;
            setUsers(responseJson['group_users'])
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
    
    function renderPage() {
        return (
            <Provider>
                <View style={styles.container}>
                <List.Section title="Accordion">
                    <List.Accordion
                        title= "Members"
                        left={props=> <List.Icon{...props} icon="folder"/>}
                        onPress={handlePress}>
                        {
                    Object.values(users).map((item, key)=>(
                    console.log(item.user_role),
                    //item.user_role =="user" ? ic="account-circle" : ic= "star",
                    <List.Item 
                    title= {item.username} 
                    key={key} 
                    style={styles.TextStyle}
                    right={props => <List.Icon {...props} icon= {"account-circle"} />}
                    />)
                    )}
                        </List.Accordion>
                </List.Section>
                <Text>{user_grouplink.group_name}</Text>
                {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/> */}
                {/* <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        
                    </Modal>
                </Portal> */}
                <Button style={{marginTop: 30}} onPress= {()=> props.navigation.navigate("requestOff", props.route.params)}>
                    <Text color='white'>Request Off</Text>
                </Button>
                <CalendarList 
                theme={{
                    calendarBackground: 'black',
                    dayTextColor: 'white',
                    monthTextColor: '#34568B',
                }}
            horizontal={true}
            pagingEnabled={true}
            calendarWidth={600}
            onDayPress={(day) => props.navigation.navigate("agenda", props.route.params)}
                markingType={'multi-period'}
                markedDates={{
                    '2021-09-20': {
                        periods: [
                            {startingDay: true, endingDay: true, color: 'yellow'},
                            {startingDate: true, endingDay: false, color: 'red'}
                        ]
                    },
                    '2021-09-21': {
                        periods: [
                            {startingDay: false, endingDay: false, color: 'red'},
                            {color: 'transparent'}
                        ]
                    }
                    // '2021-09-23': {startingDay: true, color: 'green', textColor: 'red'},
                    // '2021-09-24': {color: 'green', textColor: 'red'},
                    // '2021-09-25': {selected: true, endingDay: true, color: 'green', textColor: 'red'}
                }}
            />
            <Button style={{marginTop: 30}} onPress= {()=> props.navigation.navigate("shifts", props.route.params)}>
                    <Text color='white'>See Shifts</Text>
                </Button>
                </View>
            </Provider>
        );
    }

    function testDatePicker() {
        return(
            <View>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        )
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return(
        isLoading ? loadingPage() : renderPage()
    )
};
