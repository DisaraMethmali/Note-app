import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NoteScreen from './app/screens/NoteScreen'; // Adjust path as necessary
import NoteInputModal from './app/screens/NoteInputModal'; // Adjust path as necessary

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteScreen">
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        <Stack.Screen name="NoteInputModal" component={NoteInputModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
