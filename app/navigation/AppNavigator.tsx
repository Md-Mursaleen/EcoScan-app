import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import AppStartScreen from '@/components/ui/Welcome/AppStartScreen';
import WelcomeScreen from '@/components/ui/Welcome/WelcomeScreen';
import HomeScreen from '@/components/ui/TabNavigator/HomeScreen';
import ProfileScreen from '@/components/ui/TabNavigator/ProfileScreen';

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
                    <Image source={require('../../assets/images/insights-solid.png')} style={[styles.tabBarIconStyle, { width: 30, height: 30 }]} /> :
                    <Image source={require('../../assets/images/insights.png')} style={[styles.tabBarIconStyle, { marginTop: 20 }]} />
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
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AppStart'>
                <Stack.Screen name='AppStart' component={AppStartScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Tab' component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        minHeight: 80,
        backgroundColor: '#FFFFFF',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    tabBarLabelStyle: {
        paddingBottom: Platform.OS === 'ios' ? -2 : 20,
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'PlusJakartaBold',
        color: '#1F4E58',
        lineHeight: 14,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    tabBarIconStyle: {
        width: 30,
        height: 30,
        borderRadius: 10,
    },
});
