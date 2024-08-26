// NoteInputModal.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const NoteInputModal = ({ onAddNote }) => {
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      onAddNote(note);
      setNote(''); // Clear the input after adding the note
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your note here"
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <Button title="Add Note" onPress={handleAddNote} />
    </View>
  );
};

NoteInputModal.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff', // Replace with your primary color
    fontSize: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000', // Text color
  },
});

export default NoteInputModal;
