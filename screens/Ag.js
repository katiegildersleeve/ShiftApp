import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// @ts-expect-error
import {Agenda, CalendarList} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


//const testIDs = require('./screens/testIDs');

export default class AgendaScreen extends Component {
  constructor(props){
    super(props);
    this.user_grouplink = this.props.route.params.groupID;
    this.group = [];
  };

  state = {
    items: []
  };

  async componentDidMount(){
  return fetch('https://api.shiftycrew.repl.co/group', {
      node: 'cors',
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-group-id' : this.user_grouplink.group_id
      }
  })
  .then ( (response) => response.json() )
  .then ( (responseJson) => {
      this.group = responseJson
      console.log(this.group)
  })
  .catch((error) => {
          console.log(error)
      });
}

  render() {
    return (
      <Agenda
      theme={{
        calendarBackground: 'black',
        dayTextColor: '#34568B',
        monthTextColor: '#34568B',
      }}
        //testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={this.renderItem.bind(this)}
        //renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        showClosingKnob={true}

      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      console.log("HH");

      
//creates new arr
const newItems = {};
//copies arr to new items
Object.keys(this.state.items).forEach(key => {
  newItems[key] = this.state.items[key];
});
//saves new arr to state
this.setState({
  items: newItems
});
//console.log(this.state.items);

    // console.log(this.group);
    //   console.log(this.group['shifts']);
    //   for (let i = 0; i < 1; i++) {
          const time2 = day.timestamp + 0 * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time2);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          //   // this.state.items[strTime].push({
          //   //   name: 'Item for ' + strTime + ' #' + j,
          //   //   height: Math.max(50, Math.floor(Math.random() * 150))
          //   // });
          //  }
        //}
      }
      
      for(let i = 0; i < this.group['shifts'].length; i++){
        console.log(i);
        var timeDateStr = this.group['shifts'][i]['start_timedate'];
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
        var timeDateStr1 = this.group['shifts'][i]['end_timedate'];
        var unixTimeStamp1 = timeDateStr1['_seconds'];
        var timeDate1 = new Date(unixTimeStamp1*1000);
        var timeDateCur1 = timeDate1.toISOString().split('T')[0];
        var pm1 = timeDate1.getHours() >= 12;
        var hour121 = timeDate1.getHours() % 12;
        var minute1 = timeDate1.getMinutes();
        var time1 = hour121 + ":" + minute1 + (pm1 ? "pm" : "am");
        var person = this.group['shifts'][i]['assigned_user'];
        console.log(time);
        if(!this.state.items[timeDateCur]){
          this.state.items[timeDateCur] = [];
        } 
        console.log("here");
        this.state.items[timeDateCur].push({
          name: 'Shift from ' + time + "-" + time1 + " for " + person,
          height: Math.max(50, Math.floor(Math.random() * 150))
        });
        console.log("here2");
      }
      console.log(this.state.items);      
    }, 1000);
    
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        //testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text style={{ color: '#34568B'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text></Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});