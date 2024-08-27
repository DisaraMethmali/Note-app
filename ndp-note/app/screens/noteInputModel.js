import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

// Define the NoteInputModal component
const NoteInputModal = ({ noteId, noteText, onAddNote, onDeleteNote, onClose }) => {
  const [note, setNote] = useState(noteText || '');
  const [loading, setLoading] = useState(false);

  // Function to handle adding or updating a note
  const handleAddNote = async () => {
    if (note.trim()) {
      setLoading(true);
      try {
        if (noteId) {
          // Update existing note
          const response = await axios.put(`http://localhost:5000/api/notes/${noteId}`, { text: note });

          if (response.status === 200) {
            onAddNote(); // Call the function passed from parent
            setNote('');
            onClose(); // Close modal
          } else {
            console.error('Failed to update note:', response.statusText);
            Alert.alert('Error', 'Failed to update note. Please try again.');
          }
        } else {
          // Add new note
          const response = await axios.post('http://localhost:5000/api/notes', { text: note });

          if (response.status === 201) {
            onAddNote(response.data); // Call the function passed from parent with the new note
            setNote('');
            onClose(); // Close modal
          } else {
            console.error('Failed to add note:', response.statusText);
            Alert.alert('Error', 'Failed to add note. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error adding/updating note:', error.message);
        Alert.alert('Error', 'An error occurred while processing the note. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Input Error', 'Note cannot be empty.');
    }
  };

  // Function to handle deletion of a note
  const handleDeleteNote = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
              if (response.status === 204) {
                console.log('Note deleted successfully');
                onDeleteNote(); // Call the function passed from parent
                onClose(); // Close modal
              } else {
                console.error('Failed to delete note:', response.statusText);
                Alert.alert('Error', 'Failed to delete note. Please try again.');
              }
            } catch (error) {
              console.error('Error deleting note:', error.message);
              Alert.alert('Error', 'An error occurred while deleting the note. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{noteId ? 'Edit Note' : 'Add a Note'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your note here"
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <Button
        title={loading ? 'Processing...' : noteId ? 'Update Note' : 'Add Note'}
        onPress={handleAddNote}
        disabled={loading || !note.trim()}
      />
      {noteId && (
        <Button
          title={loading ? 'Deleting...' : 'Delete Note'}
          onPress={handleDeleteNote}
          color="#ff4d4d"
          disabled={loading}
        />
      )}
      {loading && <ActivityIndicator size="small" color="#007bff" style={styles.loader} />}
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

// Define prop types and default props
NoteInputModal.propTypes = {
  noteId: PropTypes.string,
  noteText: PropTypes.string,
  onAddNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

NoteInputModal.defaultProps = {
  noteId: null,
  noteText: '',
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
    fontSize: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
  loader: {
    marginTop: 10,
  },
});

export default NoteInputModal;
