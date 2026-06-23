import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { router, useFocusEffect } from "expo-router";

import TaskCard from "../components/TaskCard";

import { Task } from "../types/Task";
import {
  getTasks,
  saveTasks,
} from "../utils/storage";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(
    []
  );
  useEffect(() => {
    fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
    )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  }, []);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] = useState<"all" | "completed" | "not completed">("all");

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  const toggleTask = async (
    id: string
  ) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status:
              !task.status,
          }
        : task
    );

    setTasks(updated);

    await saveTasks(updated);
  };

  const deleteTask = async (
    id: string
  ) => {
    const updated = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updated);

    await saveTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") {
      return matchesSearch && task.status;
    }

    if (filter === "not completed") {
      return matchesSearch && !task.status;
    }

    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search task..."
        placeholderTextColor="#000"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
          styles.filterButton,
          filter === "all" && styles.activeFilter,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterText}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
          styles.filterButton,
          filter === "completed" &&
          styles.activeFilter,
          ]}
          onPress={() =>
          setFilter("completed")
          }
        >
          <Text style={styles.filterText}>
            Completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "not completed" &&
            styles.activeFilter,
          ]}
          onPress={() =>
            setFilter("not completed")
          }
        >
          <Text style={styles.filterText}>
            Pending
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          router.push("../add-task")
        }
      >
        <Text style={styles.addText}>
          + Add Task
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() =>
              toggleTask(item.id)
            }
            onDelete={() =>
              deleteTask(item.id)
            }
            onPress={() =>
              router.push({
                pathname:
                  "../task-details",
                params: {
                  title: item.title,
                  description:
                    item.description,
                  status:
                    item.status.toString(),
                  createdAt:
                    item.createdAt,
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
            }}
          >
            No tasks found
          </Text>
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:
        "#F5F7FA",
    },

    search: {
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 10,
      marginBottom: 15,
      color: "#000",
    },

    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },

    filterButton: {
      flex: 1,
      backgroundColor: "#E5E7EB",
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 4,
    },

    activeFilter: {
      backgroundColor: "#16887E",
    },

    filterText: {
      textAlign: "center",
      color: "white",
      fontWeight: "600",
    },

    addButton: {
      backgroundColor:
        "#16887E",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },

    addText: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    },
  });