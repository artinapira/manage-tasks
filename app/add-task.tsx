import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { Task } from "../types/Task";
import { getTasks, saveTasks } from "../utils/storage";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert(
        "Validation",
        "Title is required"
      );
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        "Validation",
        "Description is required"
      );
      return;
    }

    const existingTasks = await getTasks();

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [
      ...existingTasks,
      newTask,
    ];

    await saveTasks(updatedTasks);

    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#16887E",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});