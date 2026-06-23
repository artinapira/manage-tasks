import AsyncStorage from "@react-native-async-storage/async-storage"
import { Task } from "../types/Task"

const STORAGE_KEY = "TASKS"

export const saveTasks = async (tasks: Task[]) => {
    try {
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        );
    } catch (error) {
        console.log(error)
    }
}

export const getTasks = async (): Promise<Task[]> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data)
        }
        return []
    } catch(error) {
        console.log(error)
        return []
    }

}