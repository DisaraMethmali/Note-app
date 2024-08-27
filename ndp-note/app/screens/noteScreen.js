import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

const NoteScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://192.168.30.50:5000/api/notes');
        setNotes(response.data);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch notes.');
      }
    };

    fetchNotes();
  }, []);

  const handleAddButtonPress = () => {
    navigation.navigate('NoteInput');
  };

  const handleDeleteNote = (noteId) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.30.50:5000/api/notes/${noteId}`);
              setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
            } catch (error) {
              Alert.alert('Error', 'Could not delete the note.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderNote = ({ item }) => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>{item.content}</Text>
      <TouchableOpacity onPress={() => handleDeleteNote(item._id)}>
        <Icon name="delete" size={20} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Your Notes</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const NoteInputScreen = ({ navigation }) => {
  const [content, setContent] = useState('');

  const handleSave = async () => {
    try {
      const response = await axios.post('http://192.168.30.50:5000/api/notes', { content });
      if (response.status === 201) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Could not save the note.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not save the note.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Note Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notes" component={NoteScreen} />
        <Stack.Screen name="NoteInput" component={NoteInputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  noteContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
