import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from 'react-datetime-picker';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedStartTime: null,
      selectedEndTime: null,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
    };
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      selectedStartTime: null,
      selectedEndTime: null,
    });
  }


  hideStartTimePicker() {
    this.setState({ isStartTimePickerVisible: false });
  }

  hideEndTimePicker() {
    this.setState({ isEndTimePickerVisible: false });
  }

  handleStartTimePicked(time) {
    this.setState({ selectedStartTime: time });
    this.hideStartTimePicker();
  }

  handleEndTimePicked(time) {
    this.setState({ selectedEndTime: time });
    this.hideEndTimePicker();

    const currentTime = new Date();
    const selectedEndTime = new Date(time);

    if (selectedEndTime.getTime() === currentTime.getTime()) {
      alert('The goal has ended at the selected end time.');
    }
  }

  handleSetTimes() {
    const { selectedStartTime, selectedEndTime } = this.state;
    if (!selectedStartTime || !selectedEndTime) {
      alert('Please select a date, start time, and end time.');
      return;
    }

    alert('Times have been selected and can be used for further processing.');
  }

  render() {
    const { selectedStartDate, selectedStartTime, selectedEndTime } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const startTime = selectedStartTime ? selectedStartTime.toString() : 'Select Start Time';
    const endTime = selectedEndTime ? selectedEndTime.toString() : 'Select End Time';

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSetTimes()}
        >
            <Text style={styles.buttonText}>Set Times</Text>
        </TouchableOpacity>
        <View>
          <Text>SELECTED DATE: {startDate}</Text>
        </View>
        <View style={styles.dateContainer}>
          <View style={{width: 200}}>
            <Text>Start Time: {startTime}</Text>
            <DateTimePicker
              style={{width: '45vw'}}
              onChange={(selectedTime) => this.handleStartTimePicked(selectedTime)}
              value={selectedStartTime || new Date()}
            />
          </View>
          <View style={{width: 200}}>
            <Text>End Time: {endTime}</Text>
            <DateTimePicker
              style={{width: '45vw'}}
              onChange={(selectedTime) => this.handleEndTimePicked(selectedTime)}
              value={selectedEndTime || new Date()}
            />  
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#191919',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius:12
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});