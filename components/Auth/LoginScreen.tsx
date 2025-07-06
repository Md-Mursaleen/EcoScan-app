import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, ImageSourcePropType, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
    Tab: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [accessToken, setAccessToken] = useState();
    const [userInfo, setUserInfo] = useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "1862782058-q5384nqr4o1mj17nscs5nqavgav50ptr.apps.googleusercontent.com",
        iosClientId: "1862782058-85jb045kl4633f5ji0sv0encolgpnfv9.apps.googleusercontent.com",
        expoClientId: "1862782058-vai6nvv480madc5cm48n75sr8pmeau3s.apps.googleusercontent.com"
    });

    console.log('Redirect URI:', request?.redirectUri);

    async function fetchUserData() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        response.json().then((data) => {
            setUserInfo(data);
        });
    };

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            setAccessToken(authentication?.accessToken);
            if (authentication?.accessToken) {
                fetchUserData();
                AsyncStorage.setItem('signedUserData', JSON.stringify({ user: userInfo, accessToken, loggedIn: true }));
                navigation.navigate('Tab');
            }
        }
    }, [response]);

    const signInWithGoogle = async () => {
        promptAsync({ showInRecents: true });
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.headingTextStyle, { fontSize: 40 }]}>Eco<Text style={[styles.headingTextStyle, { fontSize: 40, color: '#61c787' }]}>Scan</Text></Text>
            <Text style={styles.titleTextStyle}>Easily track your</Text>
            <Text style={styles.subTitleTextStyle}>{`clothing's carbon footprint`}</Text>
            <Image source={require('../../assets/images/login-image.png')} style={styles.imageStyle} />
            <TouchableOpacity onPress={signInWithGoogle} style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headingTextStyle: {
        marginTop: normalize(50),
        marginLeft: normalize(30),
        fontSize: 32,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSemiBold',
        color: '#000000',
    },
    titleTextStyle: {
        marginTop: normalize(10),
        marginLeft: normalize(30),
        fontSize: 35,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
    },
    subTitleTextStyle: {
        marginTop: normalize(-8),
        marginLeft: normalize(30),
        fontSize: 29,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#61c787',
    },
    imageStyle: {
        marginTop: normalize(65),
        width: '90%',
        height: '40%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    buttonContainer: {
        padding: normalize(14),
        marginTop: 'auto',
        marginBottom: normalize(60),
        marginHorizontal: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d2a30',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16.5,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 24,
    },
});
