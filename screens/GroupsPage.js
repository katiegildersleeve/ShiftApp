import * as React from 'react';
import{TextInput, DefaultTheme, List, Modal, Portal, Text, Button, Provider, Provider as PaperProvider,} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

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
    const [text,setText] = React.useState('');

    //const [text, setText] = React.useState('');

    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#34568B',
            padding: 20,
            margin: 10,
        },
    })

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
                    <Button style={{marginTop:30}} onPress= {()=> props.navigation.navigate("main")}>
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
                    <List.Item title="Group 1" onPress= {()=> props.navigation.navigate("main")}/>
                    <List.Item title="Group 2" onPress= {()=> props.navigation.navigate("main")}/>
                </List.Accordion>
            </List.Section>
            
            <TextInput
                mode="outlined"
                label="Create Group"
                placeholder="Type Group Name"
                //right={<TextInput.Icon name="plus" />}
            />
            <Button icon="plus" mode="text" onPress= {()=> props.navigation.navigate("employer")}>
                Create new Group
            </Button>

            </View>
        </PaperProvider>
    );
    
};