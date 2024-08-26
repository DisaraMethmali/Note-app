import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';  // Correct import statement

const RoundIconBtn = ({ icon, size, color, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <AntDesign name={icon} size={size || 24} color={color || '#fff'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#1abc9c',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});

export default RoundIconBtn;
