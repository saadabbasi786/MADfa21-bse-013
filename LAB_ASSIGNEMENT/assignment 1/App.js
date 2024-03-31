import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleDone = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const renderTask = ({ item }) => (
    <View style={[styles.taskContainer, item.done && styles.taskDone]} key={item.id}>
      <View style={styles.task}>
        <Text style={styles.index}>{item.text}</Text>
        <Text style={styles.date}>{item.date} - {item.time}</Text>
      </View>
      <View style={styles.buttons}>
        {!item.done && (
          <TouchableOpacity onPress={() => handleToggleDone(item.id)} style={styles.doneButton}>
            <Text>Done</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        onChangeText={(text) => setTask(text)}
        value={task}
      />
      <TouchableOpacity onPress={handleAddTask} style={styles.button}>
        <Text>Add Task</Text>
      </TouchableOpacity>
      <ScrollView style={styles.taskList}>
        {tasks.map((item) => renderTask({ item }))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  task: {
    flexDirection: 'column',
  },
  index: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: 'lightgreen',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'tomato',
    padding: 5,
    borderRadius: 5,
  },
  taskDone: {
    backgroundColor: 'yellow',
  },
  taskList: {
    width: '100%',
  },
});
