import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function TaskCard({ ri, ci, cards, navigation }) {
  const HandleTouch = () => {
    navigation.navigate("EditTaskScreen", { index: index });
  };

  const days = [];
  for (let i = 0; i < 8; i++) {
    const current_date = new Date();
    current_date.setDate(current_date.getDate() + i);
    const options = { weekday: "long" };
    const new_date = current_date.toLocaleDateString("en-US", options);
    days.push(new_date.split(",")[0]);
  }

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const options = { weekday: "long" };
        const new_date = card.date
          .toDate()
          .toLocaleDateString("en-US", options);
        let day = new_date.split(",")[0];

        if (day === days[0]) {
          day = 1;
        } else if (day === days[1]) {
          day = 2;
        } else if (day === days[2]) {
          day = 3;
        } else if (day === days[3]) {
          day = 4;
        } else if (day === days[4]) {
          day = 5;
        } else if (day === days[5]) {
          day = 6;
        } else if (day === days[6]) {
          day = 7;
        }

        let hour = card.hour;
        if (hour >= 6 && hour <= 12) {
          hour = hour - 5;
        } else if (hour >= 1 && hour <= 5) {
          hour = hour + 7;
        }

        return hour === ri && day === ci ? (
          <View key={`${index} ${ri}`} onTouchStart={HandleTouch}>
            <Text style={styles.title}>{card.title}</Text>
            <Text>{card.description}</Text>
          </View>
        ) : (
          <View key={`${index} ${ri}`} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 15,
    color: "#000",
  },
});
