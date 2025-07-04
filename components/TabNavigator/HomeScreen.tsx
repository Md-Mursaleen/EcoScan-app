import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, ImageSourcePropType, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { normalize, moderateScale } from '@/utilis/Dimensions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';

type RootStackParamList = {
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [screen, setScreen] = useState('initial');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.cancelled) {
            uploadImage(result.uri);
        }
    };

    const handleOpenCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.cancelled) {
            uploadImage(result.uri);
        }
    };

    const uploadImage = async (uri) => {
        setScreen('uploading');
        setImage(uri);

        // Simulate upload with progress
        let progressVal = 0;
        const interval = setInterval(() => {
            progressVal += 0.05;
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload ID</Text>
            <Text style={styles.subtitle}>Upload a photo of yourself holding your valid ID for verification.</Text>

            {screen === 'initial' && (
                <View style={styles.uploadBox}>
                    <TouchableOpacity onPress={handlePickImage} style={styles.uploadButton}>
                        <Text style={styles.uploadText}>Tap to upload photo</Text>
                        <Text style={styles.hint}>PNG, JPG or PDF (max. 800x400px)</Text>
                    </TouchableOpacity>

                    <Text style={styles.or}>OR</Text>

                    <TouchableOpacity onPress={handleOpenCamera} style={styles.cameraButton}>
                        <Text style={styles.cameraText}>Open camera</Text>
                    </TouchableOpacity>
                </View>
            )}

            {screen === 'uploading' && (
                <View style={styles.uploadBox}>
                    <Text style={styles.uploadingText}>Uploading Document...</Text>
                    <Text style={styles.fileName}>{image?.split('/').pop()}</Text>
                    <Progress.Bar progress={progress} width={200} color="#0066FF" />
                </View>
            )}

            {screen === 'complete' && (
                <View style={styles.uploadBox}>
                    <Text style={styles.completeText}>✅ Upload Complete</Text>
                    <Text style={styles.fileName}>{image?.split('/').pop()}</Text>
                    <TouchableOpacity onPress={clearUpload}>
                        <Text style={styles.clearText}>🗑️ Clear Upload</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity
                style={[styles.uploadIDButton, screen === 'complete' ? styles.enabledButton : styles.disabledButton]}
                disabled={screen !== 'complete'}
            >
                <Text style={styles.uploadIDText}>Upload ID</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipTextWrapper}>
                <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#FAFAF9',
    // },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 60,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginVertical: 20,
    },
    uploadBox: {
        width: '100%',
        padding: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    uploadButton: {
        alignItems: 'center',
    },
    uploadText: {
        color: '#0066FF',
        fontSize: 16,
    },
    hint: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    or: {
        marginVertical: 15,
        fontSize: 12,
        color: '#aaa',
    },
    cameraButton: {
        backgroundColor: '#0066FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cameraText: {
        color: '#fff',
        fontSize: 14,
    },
    uploadingText: {
        fontSize: 16,
        marginBottom: 10,
    },
    fileName: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10,
    },
    completeText: {
        fontSize: 18,
        color: 'green',
        marginBottom: 10,
    },
    clearText: {
        marginTop: 10,
        color: '#d00',
    },
    uploadIDButton: {
        marginTop: 30,
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    enabledButton: {
        backgroundColor: '#0066FF',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    uploadIDText: {
        color: '#fff',
        fontSize: 16,
    },
    skipTextWrapper: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    skipText: {
        color: '#0066FF',
    },
});