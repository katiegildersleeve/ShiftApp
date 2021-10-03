import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, Switch } from 'react-native-paper';
import {CalendarList } from 'react-native-calendars';
import { View, StyleSheet } from 'react-native';

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
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <Provider>
            <View style={styles.container}>
            {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/> */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text style={{ color: '#34568B'}}>Requesting Off Info.....</Text>
                </Modal>
            </Portal>
            <Button style={{marginTop: 30}} onPress={showModal} color={'white'}>
                <Text>Request Off</Text>
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
        onDayPress={(day) => props.navigation.navigate("agenda")}
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

            {/* <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Request Off</Text>
                </Modal>
            </Portal>
            <Button style={{marginTop: 30}} onPress={showModal}>
                <Text>Request Off</Text>
            </Button>*/}

            {/* <Button icon="camera" mode="contained" color={'#34568B'} onPress= {()=> props.navigation.navigate("agenda")}>
                <Text>To Agenda</Text>
            </Button>  */}
            </View>
        </Provider>
    );
};
