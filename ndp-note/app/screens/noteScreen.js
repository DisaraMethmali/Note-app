import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import SearchBar from '../components/SearchBar'; // Import SearchBar component
import Icon from 'react-native-vector-icons/AntDesign'; // Import Icon component for the button

const NoteScreen = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation(); // Get the navigation prop

  const handleAddNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const handleAddButtonPress = () => {
    navigation.navigate('NoteInputModal', { onAddNote: handleAddNote });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good Morning, {user}</Text>
      <SearchBar 
        placeholder="Search here"
        onChangeText={(text) => console.log('Search text:', text)} // Optional: Handle text change
      />
      <View style={styles.headerContainer}>
        <Text style={styles.emptyHeader}>Add Notes</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={({ item }) => <Text style={styles.note}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  emptyHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  note: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default NoteScreen;
