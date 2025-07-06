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

const COLORS = [
    '#0066FF',
    '#01CBDC',
    '#FFA301',
    '#FF7C1D',
    '#9E51C4',
    '#66B444',
];

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
    const { image, items, totalCarbonScore, totalEcoPoints, rewards } = route.params
    // console.log('DetailsScreen', { image, items, totalCarbonScore, totalEcoPoints, rewards });

    const pieSeries = items.map((item, index) => ({
        value: item.carbonScore,
        color: COLORS[index % COLORS.length],
        label: {
            text: `${item.name}(${item.carbonScore})`,
            fontSize: 10,
            fontWeight: 'bold',
            fontFamily: 'PlusJakartaBold',
            fill: '#FFFFFF',
            offsetY: 4,
        },
    }));

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headingTextStyle}>Carbon Footprint Breakdown</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    widthAndHeight={screenWidth * 0.75}
                    series={pieSeries}
                    cover={{ radius: 0.6, color: '#FFFFFF' }}
                />
                <View style={styles.carbonScoreTextContainer}>
                    <Text style={styles.carbonScoreTextStyle}>{totalCarbonScore}</Text>
                    <Text style={styles.unitTextStyle}>kg CO₂</Text>
                    <Text style={styles.totalEstimatedTextStyle}>Total Estimated</Text>
                </View>
            </View>
            <View style={styles.ecoPointsCardContainer}>
                <Image source={require('../../assets/images/trophy-image.png')} style={styles.imageStyle} />
                <Text style={styles.ecoPointsCardTextStyle}><Text style={[styles.ecoPointsCardContainer, { fontFamily: 'PlusJakartaBold' }]}>Congratulations! </Text>
                    {`You’ve earned `}<Text style={[styles.ecoPointsCardContainer, { fontFamily: 'PlusJakartaBold' }]}>{totalEcoPoints}</Text><Text style={styles.ecoPointsCardContainer}> ecopoints from your carbon footprint of </Text><Text style={[styles.ecoPointsCardContainer, { fontFamily: 'PlusJakartaBold' }]}>{totalCarbonScore}</Text><Text style={styles.ecoPointsCardContainer}> kg CO₂. Redeem them for green rewards!</Text>
                </Text>
            </View>
            <Text style={[styles.headingTextStyle, { marginVertical: 0, marginTop: 30 }]}>Rewards available</Text>
            <FlatList
                data={rewards}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.rewardItemContainer}>
                        <View style={{ maxWidth: '82%' }}>
                            <Text style={styles.rewardTitleTextStyle}>{item.title}</Text>
                            <Text style={styles.rewardDescriptionTextStyle}>{item.description}</Text>
                            <Text style={styles.availabilityTextStyle}>Available to Redeem</Text>
                        </View>
                        <Image source={require('../../assets/images/gift-image.png')} style={styles.giftImageStyle} />
                    </View>
                )}
                contentContainerStyle={styles.rewardsContentContainer}
            />
        </ScrollView >
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    headingTextStyle: {
        marginVertical: normalize(30),
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
    },
    chartContainer: {
        position: 'relative',
        marginBottom: normalize(25),
        alignItems: 'center',
        justifyContent: 'center',
    },
    carbonScoreTextContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    carbonScoreTextStyle: {
        marginTop: -12,
        fontSize: 35,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
    },
    unitTextStyle: {
        marginTop: -5,
        marginBottom: normalize(8),
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
    },
    totalEstimatedTextStyle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#808080',
    },
    ecoPointsCardContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F8F8',
        borderWidth: 1.5,
        borderColor: '#EEEEEE',
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1,
        overflow: 'hidden',
    },
    imageStyle: {
        marginLeft: -10,
        width: 65,
        height: 65,
        resizeMode: 'contain',
    },
    ecoPointsCardTextStyle: {
        maxWidth: '82%',
        marginRight: -5,
        marginBottom: normalize(15),
        fontSize: 13.5,
        fontFamily: 'PlusJakartaMedium',
        color: '#000000',
        lineHeight: 20,
    },
    rewardsContentContainer: {
        paddingBottom: 100,
        marginTop: 10,
    },
    rewardItemContainer: {
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        borderRadius: 12,
    },
    giftImageStyle: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    rewardTitleTextStyle: {
        marginBottom: 4,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
    },
    rewardDescriptionTextStyle: {
        marginBottom: 8,
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#555555',
    },
    availabilityTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#32CD32',
    },
});
