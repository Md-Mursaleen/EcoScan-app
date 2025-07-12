import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const texts = [
    'Build habits, one outfit at a time, with personalized sustainability insights!',
    'Turn shopping into measurable savings with eco-scores and reward points.',
    'Track fashion’s impact and earn rewards for making greener choices.',
];

type RootStackParamList = {
    Welcome: undefined;
    Tab: undefined;
    Login: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    const translateAnimation = useRef(new Animated.Value(width)).current;
    const [textIndex, setTextIndex] = useState(0);

    const handleNavigation = async () => {
        const hasShownWelcome = await AsyncStorage.getItem('hasShownWelcome');
        const signedUserData = await AsyncStorage.getItem('signedUserData');
        const signedData = JSON.parse(signedUserData);
        console.log('hasShownWelcome:', hasShownWelcome);
        console.log('signedData:', signedData);

        if (hasShownWelcome === null) {
            navigation.dispatch(StackActions.replace('Welcome'));
        }
        else {
            if (signedData.loggedIn) {
                navigation.dispatch(StackActions.replace('Tab'));
            }
            else {
                navigation.dispatch(StackActions.replace('Login'));
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(handleNavigation, 10000);

        const startAnimation = () => {
            translateAnimation.setValue(width);

            Animated.sequence([
                Animated.timing(translateAnimation, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.delay(1000),
                Animated.timing(translateAnimation, {
                    toValue: -width,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                startAnimation();
            });
        };

        startAnimation();

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/splash-image.jpg')} accessibilityLabel='Splash Screen Image' style={styles.backgroundImageStyle} />
            <View style={styles.overlayStyle} />
            <Text style={styles.imageTitleTextStyle}>ECOSCAN</Text>
            <Animated.Text style={[styles.imageDescriptionTextStyle, { transform: [{ translateX: translateAnimation }] }]}>{texts[textIndex]}</Animated.Text>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backgroundImageStyle: {
        width: '100%',
        height: '100%',
    },
    imageTitleTextStyle: {
        position: 'absolute',
        top: '28%',
        right: '40%',
        fontSize: 64,
        color: '#FBF3E8',
        letterSpacing: 5.12,
        textAlign: 'center',
        fontWeight: '700',
        fontFamily: 'AileronBold',
        lineHeight: 64,
        transform: [{ rotate: '-90deg' }],
        opacity: 0.6,
    },
    overlayStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: '#00000030',
    },
    imageDescriptionTextStyle: {
        position: 'absolute',
        bottom: '10%',
        width: normalize(350),
        alignSelf: 'center',
        fontSize: 22,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        lineHeight: 32,
    },
});
