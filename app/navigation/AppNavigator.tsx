import React from 'react';
import { StyleSheet, Platform, Image, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import WelcomeScreen from '@/components/Welcome/WelcomeScreen';
import HomeScreen from '@/components/TabNavigator/HomeScreen';
import ProfileScreen from '@/components/TabNavigator/ProfileScreen';
import SplashScreen from '@/components/Splash/SplashScreen';
import LoginScreen from '@/components/Auth/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: styles.tabBarStyle }} initialRouteName='Home'>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: ({ focused }) => {
                    return <Text style={styles.tabBarLabelStyle}>{focused ? 'Home' : ''}</Text>
                },
                tabBarIcon: ({ focused }) => focused ?
                    <Image source={require('../../assets/images/scanner-solid.png')} style={[styles.tabBarIconStyle, { width: 30, height: 30 }]} /> :
                    <Image source={require('../../assets/images/scanner.png')} style={[styles.tabBarIconStyle, { marginTop: 20 }]} />
            }} />
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarLabel: ({ focused }) => {
                    return <Text style={styles.tabBarLabelStyle}>{focused ? 'Profile' : ''}</Text>
                },
                tabBarIcon: ({ focused }) => focused ?
                    <Image source={require('../../assets/images/profile-photo.png')} style={[styles.tabBarIconStyle, { width: 32, height: 32, borderWidth: 1, borderColor: '#1F4E58' }]} /> :
                    <Image source={require('../../assets/images/profile-photo.png')} style={[styles.tabBarIconStyle, { marginTop: 20 }]} />
            }} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
            <Stack.Screen name='Splash' component={SplashScreen} />
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Tab' component={TabNavigator} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        minHeight: 100,
        backgroundColor: '#FFFFFF',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    tabBarLabelStyle: {
        paddingBottom: Platform.OS === 'ios' ? -2 : 20,
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'PlusJakartaBold',
        color: '#1F4E58',
        lineHeight: 22,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    tabBarIconStyle: {
        width: 30,
        height: 30,
        borderRadius: 10,
    },
});
