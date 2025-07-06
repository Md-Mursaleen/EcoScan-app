import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, ImageSourcePropType, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import PieChart from 'react-native-pie-chart';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

type RootStackParamList = {
    Tab: undefined;
};

type RedeemScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const RedeemScreen = () => {
    const navigation = useNavigation<RedeemScreenNavigationProp>();

    const handleClose = () => {
        navigation.navigate('Tab');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/trophy-image.png')} style={styles.imageStyle} />
            <Text style={styles.titleTextStyle}>Reward Successfully Redeemed!</Text>
            <Text style={styles.subTitleTextStyle}>
                {`You've just made a greener choice!.\nThanks for supporting sustainable fashion.`}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Continue</Text>
            </TouchableOpacity>
        </View >
    );
}

export default RedeemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        marginBottom: 30,
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginBottom: 15,
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
        textAlign: 'center',
    },
    subTitleTextStyle: {
        marginBottom: 40,
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#808080',
        textAlign: 'center',
    },
    buttonContainer: {
        padding: normalize(14),
        width: '100%',
        marginHorizontal: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d2a30',
        borderRadius: 12,
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
