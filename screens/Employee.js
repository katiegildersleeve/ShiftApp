import { CurrentRenderContext } from '@react-navigation/native';
import * as React from 'react';
import { Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { View, } from 'react-native-paper';

export default function Employee(props) {

    return(
        <CalendarList 
        horizontal={true}
        pagingEnabled={true}
        calendarWidth={200}
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
    );
    
}