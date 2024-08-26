import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/colors'; // Adjust the import path as needed

const NoteScreen = ({ user }) => { // Pass user as a prop
    const [greet, setGreet] = useState('');

    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs >= 5 && hrs < 12) {
            setGreet('Morning');
        } else if (hrs >= 12 && hrs < 17) {
            setGreet('Afternoon');
        } else {
            setGreet('Evening');
        }
    };

    useEffect(() => {
        findGreet();
    }, []);

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <View style={styles.container}>
                <Text style={styles.header}>Good {greet}, {user.name}!</Text>
            </View>
        </>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,  // Ensure you have the primary color defined in colors
    },
});

export default NoteScreen;
