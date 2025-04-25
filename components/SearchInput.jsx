import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../components/colors';

const SearchInput = ({ value, onChangeText }) => {
    return (
        <View style={styles.searchContainer}>
            <Ionicons
                name="search"
                size={18}
                color={Colors.primary}
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.input}
                placeholder="Buscar"
                placeholderTextColor={Colors.searchPlaceholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.accentDark,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 40,
        height: 40,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        padding: 0,
        ...Platform.select({
            android: {
                paddingTop: 2,
            },
        }),
    },
});

export default SearchInput;