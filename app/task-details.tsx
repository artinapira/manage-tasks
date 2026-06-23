import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function TaskDetailsScreen() {
  const {
    title,
    description,
    status,
    createdAt,
  } = useLocalSearchParams();

  const formattedDate = new Date(
    createdAt as string
  ).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.label}>
        Description:
      </Text>

      <Text style={styles.text}>
        {description}
      </Text>

      <Text style={styles.label}>
        Status:
      </Text>

      <Text style={styles.text}>
        {status === "true"
          ? "Completed"
          : "Pending"}
      </Text>

      <Text style={styles.label}>
        Created:
      </Text>

      <Text style={styles.text}>
        {formattedDate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  text: {
    color: "#444",
    marginTop: 5,
  },
});