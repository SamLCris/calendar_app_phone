import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateTaskScreen } from "./screens/createtaskscreen";
import { TaskScreen } from "./screens/tasks";
import { EditScreen } from "./screens/editaskscreen";

const RootStack = createStackNavigator();

function MyStack() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="TaskScreen" component={TaskScreen} />
      <RootStack.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
      <RootStack.Screen name="EditTaskScreen" component={EditScreen} />
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
