import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, ImageSourcePropType, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleLogout = async () => {
        try {
            const storedData = await AsyncStorage.getItem('signedUserData');
            const parsedData = storedData ? JSON.parse(storedData) : null;
            const accessToken = parsedData?.accessToken;

            if (accessToken) {
                await AuthSession.revokeAsync(
                    { token: accessToken },
                    { revocationEndpoint: 'https://oauth2.googleapis.com/revoke' }
                );
            }

            await AsyncStorage.removeItem('signedUserData');
            navigation.replace('Login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text onPress={handleLogout} style={styles.logoutTextStyle}>Log out</Text>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    logoutTextStyle: {
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 30,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#FF0000',
        textAlign: 'center',
    },
});