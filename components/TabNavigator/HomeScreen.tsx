import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, ImageSourcePropType, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

type ImageData = {
    uri: string;
    fileName: string;
    type: string;
};

type RootStackParamList = {
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [screen, setScreen] = useState('initial');
    const [image, setImage] = useState<ImageData | null>(null);
    const [progress, setProgress] = useState(0);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            uploadImage({
                uri: asset.uri,
                fileName: asset.fileName || asset.uri.split('/').pop() || 'unknown',
                type: asset.type || 'image',
            });
        }
    };

    const handleOpenCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            uploadImage({
                uri: asset.uri,
                fileName: asset.fileName || asset.uri.split('/').pop() || 'unknown',
                type: asset.type || 'image',
            });
        }
    };

    const uploadImage = async ({ uri, fileName, type }: ImageData) => {
        setScreen('scanning');
        setImage({ uri, fileName, type });

        let progressVal = 0;
        const interval = setInterval(() => {
            progressVal = progressVal + 0.05;
            if (progressVal >= 1) {
                clearInterval(interval);
                setScreen('complete');
            }
            setProgress(progressVal);
        }, 100);
    };

    const clearUpload = () => {
        setImage(null);
        setProgress(0);
        setScreen('initial');
    };

    const getFileTypeIcon = (fileName?: string) => {
        if (fileName?.endsWith('.png')) {
            return require('../../assets/images/png-image.png');
        } else if (fileName?.endsWith('.jpg') || fileName?.endsWith('.jpeg')) {
            return require('../../assets/images/jpg-image.png');
        } else {
            return require('../../assets/images/default-image.png');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleTextStyle}>Upload Item</Text>
            <Text style={styles.subTitleTextStyle}>Upload a photo of your clothing item to assess its carbon footprint and earn eco-reward points.</Text>
            {screen === 'initial' && (
                <View style={styles.imageUploadContainer}>
                    <Image source={require('../../assets/images/upload-image.png')} style={styles.imageStyle} />
                    <TouchableOpacity onPress={handlePickImage} style={styles.uploadButtonContainer}>
                        <Text style={styles.uploadTextStyle}>Tap to upload photo</Text>
                        <Text style={styles.infoTextStyle}>PNG, JPG or PDF (max. 800x400px)</Text>
                    </TouchableOpacity>
                    <Text style={styles.orTextStyle}>OR</Text>
                    <TouchableOpacity onPress={handleOpenCamera} style={styles.cameraButtonContainer}>
                        <Text style={styles.cameraTextStyle}>Scan with Camera</Text>
                    </TouchableOpacity>
                </View>
            )}
            {screen === 'scanning' && (
                <View style={[styles.imageUploadContainer, { height: '39%' }]}>
                    <Image source={getFileTypeIcon(image?.fileName)} style={styles.imageIconStyle} />
                    <Progress.Bar progress={progress} width={285} borderRadius={3.5} height={5} borderWidth={StyleSheet.hairlineWidth} borderColor="#e7f0fd" unfilledColor="#e7f0fd" color="#0052FE" />
                    <Text style={styles.scanningTextStyle}>Scanning Item...</Text>
                    <Text style={styles.fileNameTextStyle}>{image?.fileName}</Text>
                </View>
            )}
            {screen === 'complete' && (
                <View style={[styles.imageUploadContainer, { height: '39%' }]}>
                    {/* <LottieView source={require('../../assets/animations/login-animation.json')}
                            autoPlay={true}
                            loop={true}
                            style={styles.lottieAnimationStyle} /> */}
                    <Image source={require('../../assets/images/completed-image.png')} style={styles.completedImageStyle} />
                    <Text style={styles.completeTextStyle}>Scan Complete</Text>
                    <Text style={styles.fileNameTextStyle}>{image?.fileName}</Text>
                    <TouchableOpacity onPress={clearUpload} style={styles.clearTextContainer}>
                        <Image source={require('../../assets/images/delete-icon.png')} style={styles.deleteIconStyle} />
                        <Text style={styles.clearTextStyle}>Remove Item</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={[styles.uploadScanButtonContainer, screen === 'complete' ? { backgroundColor: '#0066FF' } : { backgroundColor: '#CCCCCC' }]}
                disabled={screen !== 'complete'}>
                <Text style={styles.uploadScanButtonTextStyle}>View Carbon Score</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    titleTextStyle: {
        marginTop: normalize(40),
        fontSize: 23,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
    },
    subTitleTextStyle: {
        marginTop: 4,
        marginBottom: normalize(20),
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#000000',
    },
    imageUploadContainer: {
        padding: normalize(30),
        marginVertical: 20,
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#EEEEEE',
        borderRadius: 10,
    },
    imageStyle: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
    },
    uploadButtonContainer: {
        alignItems: 'center',
    },
    uploadTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#0066FF',
    },
    infoTextStyle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#999999',
    },
    orTextStyle: {
        marginVertical: 15,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
    },
    cameraButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0052FE',
        borderRadius: 8,
    },
    cameraTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 20,
    },
    imageIconStyle: {
        marginTop: 10,
        marginBottom: normalize(33),
        width: normalize(60),
        height: normalize(60),
        resizeMode: 'contain',
    },
    scanningTextStyle: {
        marginTop: normalize(13),
        marginBottom: normalize(8),
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
    },
    fileNameTextStyle: {
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#777777',
    },
    lottieAnimationStyle: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: normalize(5),
        alignSelf: 'center',
        resizeMode: 'contain',
        overflow: 'hidden',
    },
    completedImageStyle: {
        marginTop: -20,
        width: normalize(130),
        height: normalize(130),
        resizeMode: 'contain',
    },
    completeTextStyle: {
        marginTop: -20,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'PlusJakartaBold',
        color: '#000000',
    },
    clearTextContainer: {
        marginTop: normalize(18),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIconStyle: {
        marginRight: normalize(10),
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: '#000000',
    },
    clearTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#000000',
    },
    uploadScanButtonContainer: {
        padding: normalize(13),
        marginHorizontal: normalize(5),
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    uploadScanButtonTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'PlusJakartaMedium',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 24,
    },
});
