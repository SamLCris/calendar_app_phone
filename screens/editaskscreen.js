import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler"; // Remove import for Button from "react-native-share"
import { useState } from "react";
import db from "../database/database";
import { updateDoc,doc,deleteDoc } from "firebase/firestore";
import { useRoute} from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const EditScreen = ( {navigation}) => {
  const route = useRoute();
  const index = route.params.index;
  
  
  
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
    await updateDoc(doc(db, "tasks", index), {
      title: state.title,
      description: state.description,
    });
    navigation.navigate("TaskScreen");
  }

  async function DeleteData() {
    await deleteDoc(doc(db, "tasks", index));
    navigation.navigate("TaskScreen");
  }

  return (
    <View style={styles.container}>
      <Text>Editar</Text>
      <TextInput
        style={styles.textinput}
        placeholder="title"
        onChangeText={(val) => SetData("title", val)}
      ></TextInput>
      <TextInput
        style={styles.textinput}
        placeholder="description"
        onChangeText={(val) => SetData("description", val)}
      ></TextInput>
      <Button title="Save" onPress={EditData}></Button>
      <Button color={"#DC143C"} title="Delete" onPress={DeleteData}></Button> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  textinput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 20,
  },
});
