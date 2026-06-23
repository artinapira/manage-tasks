import React from "react";

import { Task } from "../types/Task";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/Colors";

interface Props {
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
    onPress: () => void;
}

export default function TaskCard({
    task, 
    onToggle, 
    onDelete, 
    onPress
}: Props) {
    return(
        <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text
        style={
          styles.title}
      >
        {task.title}
      </Text>

      <Text style={styles.description}>
        {task.description}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={
            task.status ? styles.completeBtn : styles.notCompleteBtn}
          onPress={onToggle}
        >
          <Text style={styles.btnText}>
            {task.status
              ? "Mark as not completed"
              : "Mark as Completed"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={onDelete}
        >
          <Text style={styles.btnText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    marginTop: 5,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    marginTop: 12,
  },
  notCompleteBtn: {
    backgroundColor: "#16887E",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  completeBtn: {
    backgroundColor: "#AABA9F",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: "#DC2626",
    padding: 8,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
  },
});