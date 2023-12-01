import { View, Text } from "react-native";
import { Button } from "react-native";
import { WeekGrid } from "../components/WeekGrid";

export const TaskScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate("CreateTaskScreen")}
        title="Crea una tarea"
      ></Button>
      <WeekGrid navigation={navigation} />
    </View>
  );
};



