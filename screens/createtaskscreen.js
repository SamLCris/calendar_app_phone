import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../database/database";

export const CreateTaskScreen = ({ navigation }) => {
  const [state, SetState] = useState({
    title: "",
    description: "",
    date: new Date(),
    hour: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);

  const SetData = (key, value) => {
    SetState({
      ...state,
      [key]: value,
    });
  };

  async function HandlePress() {
    await addDoc(collection(db, "tasks"), {
      title: state.title,
      description: state.description,
      date: state.date,
      hour: state.hour,
    });
    navigation.navigate("TaskScreen");
  }

  const handleDatePress = () => {
    setShowDatePicker(true);
  };
  const handleHourPress = () => {
    setShowHourPicker(true);
  };
  const handleHourChange = (event, selectedHour) => {
    setShowHourPicker(false);
    if (selectedHour) {
      const currentHour = new Date(selectedHour);
      hour = currentHour.getHours();
      SetData("hour", hour);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      SetData("date", currentDate);
    }
  };

  return (
    <View>
      <Text>Crear tarea</Text>
      <TextInput
        placeholder="Title"
        onChangeText={(value) => SetData("title", value)}
      />
      <TextInput
        placeholder="Description"
        multiline
        numberOfLines={4}
        onChangeText={(value) => SetData("description", value)}
      />
      <Button title="Select Date" onPress={handleDatePress} />
      {showDatePicker && (
        <DateTimePicker
          style={{ width: 200 }}
          value={state.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Select Hour" onPress={handleHourPress} />
      {showHourPicker && (
        <DateTimePicker
          style={{ width: 200 }}
          value={state.hour}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={handleHourChange}
        />
      )}
      <Button title="Save" onPress={HandlePress} />
    </View>
  );
};
