
import React from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar } from 'react-native';

const Intro = () => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text>Enter Your Name to Continue</Text>
        <TextInput placeholder="Your Name" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Intro;
