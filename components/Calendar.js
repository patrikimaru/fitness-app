import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '', // Initialize with empty values
      endTime: '', // Initialize with empty values
      selectedStartTime: null, // To store selected start time
      selectedEndTime: null, // To store selected end time
    };
  }

  handleStartTimeChange = (time) => {
    this.setState({ startTime: time });
  };

  handleEndTimeChange = (time) => {
    this.setState({ endTime: time });
  };

  handleSetTimes = () => {
    const { startTime, endTime } = this.state;
    
    // You can add validation and formatting as needed
    
    this.setState({
      selectedStartTime: startTime,
      selectedEndTime: endTime,
    });
  };

  render() {
    const { startTime, endTime, selectedStartTime, selectedEndTime } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSetTimes()}>
          <Text style={styles.buttonText}>Set Times</Text>
        </TouchableOpacity>

        <View>
          <View style={{ width: 200 }}>
            <Text>Start Time:</Text>
            <TextInput
              value={startTime}
              placeholder="Select Start Time"
              onChangeText={(text) => this.handleStartTimeChange(text)}
            />
          </View>

          <View style={{ width: 200 }}>
            <Text>End Time:</Text>
            <TextInput
              value={endTime}
              placeholder="Select End Time"
              onChangeText={(text) => this.handleEndTimeChange(text)}
            />
          </View>
        </View>

        {selectedStartTime && selectedEndTime && (
          <View>
            <Text>Selected Start Time: {selectedStartTime}</Text>
            <Text>Selected End Time: {selectedEndTime}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Mark as done</Text>
            </TouchableOpacity>
          </View>
        )}
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
  button: {
    backgroundColor: '#191919',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
