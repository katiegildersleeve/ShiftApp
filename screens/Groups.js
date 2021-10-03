import { StatusBar } from "expo-status-bar";
import React, { useState, setState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Modal
} from "react-native";

class Groups extends React.Component {
    constructor()
    {
        super();
        this.state = {
            show:false
        }
    }
    render(props){
        return(
            <View style={styles.container}>
                {/* <TouchableOpacity style={styles.add_button}> */}
                    <Button
                        title= "Add Group +"
                        onPress = {() => {this.setState({show:true})}}/>
                    <Modal
                    transparent = {true}
                    visible={this.state.show}>
                        <View style = {{backgroundColor: "blue", flex:1}}>
                            <View style = {{backgroundColor: "black", margin:80, padding:20, borderRadius:10, flex:1}}>
                                <Text style = {{fontSize:30}}>(enter group code info)</Text>
                                <Button title = "CLOSE" onPress={() => {this.setState({show:false})}}/>

                                <Button title = "ADD" onPress={() => this.props.navigation.navigate("calendar")}/>
                            </View>
                        </View>
                    </Modal>
                {/* </TouchableOpacity> */}
                <StatusBar style = "dark" />
            </View>
        );
    }
}

// export default Groups(props);
export default Groups;

// export default function Groups(props) {
//     return (
        
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex:2,
        backgroundColor: "white",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
    },
    
    inputView: {
        backgroundColor: "#6495ED",
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

    add_button: {
        height: 30,
        marginBottom: 30,
    },
})