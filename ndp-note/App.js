import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Intro from './app/screens/intro'; // Ensure the correct path
import NoteScreen from './app/screens/noteScreen'; // Ensure the correct path
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteInputModal from './app/screens/noteInputModel';
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  // Function to find the user from AsyncStorage
  const findUser = async () => {
    try {
      const result = await AsyncStorage.getItem('user');
      if (result !== null) {
        setUser(result); // Assuming result is a plain string
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
      await AsyncStorage.setItem('user', name); // Assuming name is a plain string
      setUser(name); // Update state after saving
      console.log('User name saved:', name);
    } catch (error) {
      console.error('Error saving user name:', error);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen 
            name="Note" 
            component={NoteScreen} 
            initialParams={{ user }}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen 
            name="Intro" 
            options={{ 
              headerShown: false 
            }}
          >
            {(props) => <Intro {...props} onSaveUser={saveUser} />}
          </Stack.Screen>
        )}
        <Stack.Screen 
          name="NoteInputModal" 
          component={NoteInputModal} 
          options={{ 
            presentation: 'modal' 
          }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
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
