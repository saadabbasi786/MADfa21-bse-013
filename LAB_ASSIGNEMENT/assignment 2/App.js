import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MainScreen from './components/MainScreen.js';
import TaskEntryScreen from './components/TaskEntrySecreen.js';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Main');

  const handleNavigateToTaskEntry = () => {
    setCurrentScreen('TaskEntry');
  };

  const handleNavigateToMain = () => {
    setCurrentScreen('Main');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Main' ? (
        <MainScreen onNavigateToTaskEntry={handleNavigateToTaskEntry} />
      ) : (
        <TaskEntryScreen onNavigateToMain={handleNavigateToMain} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
