import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, ImageSourcePropType, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import axios from 'axios';

type RootStackParamList = {
    Details: {
        image: ImageData;
        items: { name: string; carbonScore: number; ecoPoints: number }[];
        totalCarbonScore: number;
        totalEcoPoints: number;
        rewards: { id: string; title: string; requiredPoints: number; description: string }[];
    };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const DetailsScreen = () => {
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    const route = useRoute<DetailsScreenRouteProp>();
    // const { image, items, totalScore, ecoPoints, rewards } = route.params;
    // console.log('DetailsScreen', { image, items, totalScore, ecoPoints, rewards });

    return (
        <View style={styles.container}>

        </View>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
