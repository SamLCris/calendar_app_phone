import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler"; // Remove import for Button from "react-native-share"
import { useState } from "react";
import db from "../database/database";
import { updateDoc,doc } from "firebase/firestore";

export const EditScreen = () => {
  const [state, SetState] = useState({
    title: "",
    description: "",
  });

  const SetData = (k, v) => {
    SetState({
      ...state,
      [k]: v,
    });
  };

  async function EditData() {
    await updateDoc(doc(db, "tasks", doc.id), {
      title: state.title,
      description: state.description,
    });
  }

  return (
    <View>
      <Text>Editar</Text>
      <TextInput
        placeholder="title"
        onChangeText={(val) => SetData("title", val)}
      ></TextInput>
      <TextInput
        placeholder="description"
        onChangeText={(val) => SetData("description", val)}
      ></TextInput>
      <Button title="Save" onPress={EditData}></Button>
    </View>
  );
};
