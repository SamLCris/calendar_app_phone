import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TaskCard } from "./TaskCard";
import { useEffect, useState } from "react";
import db from "../database/database";
import { onSnapshot, collection } from "firebase/firestore";

export function WeekGrid({ navigation }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(taskList);
    });

    // Return the unsubscribe function to clean up the listener
    return () => unsubscribe();
  }, []);

  
  // Dummy data for the grid
  const days = [];
  for (var i = 0; i < 8; i++) {
    const current_date = new Date();
    current_date.setDate(current_date.getDate() + i);
    const options = { weekday: "long" };
    const new_date = current_date.toLocaleDateString("en-US", options);
    days.push(new_date.split(",")[0]);
  }
  const dates = [];
  for (var i = 0; i < 8; i++) {
    const current_date = new Date();
    current_date.setDate(current_date.getDate() + i);
    const options = { weekday: "long" };
    const new_date = current_date.toLocaleDateString("en-US", options);
    dates.push(new_date.split(",")[1].split("/")[1]);
  }

  const hours = [
    "",
    "6 am",
    "7 am",
    "8 am",
    "9 am",
    "10 am",
    "11 am",
    "12 pm",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
    "6 pm",
    "7 pm",
    "8 pm",
    "9 pm",
    "10 pm",
    "11 pm",
  ];

  const numRows = 18;
  const numCols = 8;
  var fcv = 0;

  return (
    <ScrollView>
      <View style={styles.gridContainer}>
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: numCols }, (_, colIndex) => {
              fcv = colIndex === 0 ? styles.fc : styles.cell;
              return (
                <View key={colIndex} style={fcv}>
                  {rowIndex === 0 && colIndex >= 0 ? (
                    <>
                      <Text>
                        {colIndex === 0 ? "hour" : days[colIndex - 1]}
                      </Text>
                      <Text>{colIndex === 0 ? "" : dates[colIndex - 1]}</Text>
                    </>
                  ) : colIndex === 0 ? (
                    <Text>{hours[rowIndex]}</Text>
                  ) : (
                    <TaskCard
                      ri={rowIndex}
                      ci={colIndex}
                      cards={cards}
                      navigation={navigation}
                    />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "column",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  cell: {
    flex: 1,
    width:106,
    borderWidth: 1,
    borderColor: "#ddd", // Use a lighter color for borders
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white", // Add a background color
    minHeight: 130,
  },
  fc: {
    width: 45,
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
});
