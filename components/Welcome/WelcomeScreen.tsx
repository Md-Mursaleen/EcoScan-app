import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, ImageSourcePropType, FlatList, Linking, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Login: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const WelcomeScreen = () => {
    const navigation = useNavigation<WelcomeScreenNavigationProp>();

    const handleGetStarted = async () => {
        await AsyncStorage.setItem('hasShownWelcome', 'true');
        navigation.dispatch(StackActions.replace('Login'));
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/welcome-image.png')} style={styles.imageStyle} />
            <View style={styles.headerContainer}>
                <Text style={styles.titleTextStyle}>Welcome to</Text>
                <Text style={[styles.titleTextStyle, { marginTop: -10, fontSize: 40 }]}>Eco<Text style={[styles.titleTextStyle, { fontSize: 40, color: '#668571' }]}>Scan</Text></Text>
            </View>
            <Text style={styles.subTitleTextStyle}>{`Scan your clothes' carbon footprint and earn eco-rewards`}</Text>
            <TouchableOpacity onPress={handleGetStarted} style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Start Scanning</Text>
                <Feather name='arrow-right' size={24} color='#FFFFFF' style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    imageStyle: {
        marginTop: normalize(65),
        width: '85%',
        height: '35%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTextStyle: {
        marginTop: normalize(15),
        fontSize: 32,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSemiBold',
        color: '#000000',
        textAlign: 'center',
    },
    subTitleTextStyle: {
        marginTop: normalize(20),
        maxWidth: '80%',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#A7A7A7',
        fontFamily: 'PlusJakartaMedium',
        textAlign: 'center',
    },
    buttonContainer: {
        padding: normalize(14),
        marginTop: 'auto',
        marginBottom: normalize(60),
        marginHorizontal: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#668571',
        borderRadius: 5,
    },
    buttonTextStyle: {
        marginRight: normalize(-18),
        marginLeft: 'auto',
        fontSize: 16.5,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 24,
    },
});
