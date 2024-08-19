import { View, StyleSheet, Text, TextInput } from 'react-native';

const Intro = () => {
  return (
    <View style={styles.container}>
      <Text>Enter Your Name to Continue</Text>
      <TextInput placeholder="Your Name" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Intro;
