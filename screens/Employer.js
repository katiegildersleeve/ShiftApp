import * as React from 'react';
import { BottomNavigation, Modal, Portal, Text, Button, Provider, List, Drawer, HelperText, TextInput } from 'react-native-paper';
import { View, StyleSheet} from 'react-native';
import { CalendarList, Agenda } from 'react-native-calendars';

const CalendarRoute = () => <CalendarList 
theme={{
    calendarBackground: '#34568B',
    monthTextColor: 'black',
    dayTextColor: 'white',
}}
horizontal={true}
pagingEnabled={true}
calendarWidth={800}/>;

const MessagesRoute = () => <TextInput
outlineColor="#34568B"
mode="outlined"
label="Send a Message"
placeholder="Type something"
// right={<TextInput.Affix text="/100" />}
/>;
    
    

export default function Employer(){
    const [text, setText] = React.useState('');
    const onChangeText = text => setText(text);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'calendar', title: 'Calendar', icon: 'calendar-account'},
        {key: 'messages', title: 'Messages', icon: 'chat-plus'},
    ]);
    const renderScene = BottomNavigation.SceneMap({
        calendar: CalendarRoute,
        messages: MessagesRoute,
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
  const containerStyle = {backgroundColor: 'black', padding: 10};

  const [active, setActive] = React.useState('');

    return(
        <Provider>
            <View style={styles.container}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Button icon='account-plus' style={{marginTop: 30}} onPress={showModal}>
          Add Group Member
        </Button>

        <BottomNavigation
            navigationState= {{index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
        </View>
        </Provider>
        
    );
}