import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/screens/intro';

export default function App() {
  const [user, setUser] = useState(null);

  // Function to find the user from AsyncStorage
  const findUser = async () => {
    try {
      const result = await AsyncStorage.getItem('user');
      if (result !== null) {
        setUser(result);
        console.log('User found:', result);
      } else {
        console.log('No user found, please enter your name.');
      }
    } catch (error) {
      console.error('Error retrieving user name:', error);
    }
  };

  // Function to save the user to AsyncStorage
  const saveUser = async (name) => {
    try {
      await AsyncStorage.setItem('user', name);
      setUser(name); // Update state after saving
      console.log('User name saved:', name);
    } catch (error) {
      console.error('Error saving user name:', error);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  if (user) {
    return (
      <View style={styles.container}>
        <Text>Welcome back, {user}!</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Intro onSaveUser={saveUser} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
