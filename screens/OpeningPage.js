import * as React from "react";
import 'react-native-gesture-handler';
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import {
    Button,
    TextInput,
    Provider as PaperProvider,
} from 'react-native-paper';


export default class OpeningPage extends React.Component {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      const resp = await fetch("https://api.sampleapis.com/coffee/hot");
      const data = await resp.json();
      setData(data);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const renderItem = ({ item }) => {
      return (
        <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
          {item.title}
        </Box>
      );
    };
  
    return (
      <NativeBaseProvider>
        <Center flex={1}>
        <Box> Fetch API</Box>
          {loading && <Box>Loading..</Box>}
          {data && (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </Center>
      </NativeBaseProvider>
    );

}

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

    // const [user, setUser] = React.useState('');
    // const [pass, setPass] = React.useState('');
    // const onChangeUser = user => setUser(user);
    // const onChangePass = pass => setPass(pass);
    
    // const hasErrors = () => {
    //     return !user.includes('@');
    // };
    

