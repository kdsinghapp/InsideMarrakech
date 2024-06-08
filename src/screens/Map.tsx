import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
    const [destination, setDestination] = useState({
        latitude: 22.719568,
        longitude: 75.857727,
    });
    const [showDirections, setShowDirections] = useState(false);
    const navigation = useNavigation();

    const handleGetDirections = () => {
        setShowDirections(true);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 22.701384,
                    longitude: 75.867401,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 22.701384,
                        longitude: 75.867401,
                    }}
                    title="Sapna Sangeeta Rd"
                    description="Snehnagar, Indore, Madhya Pradesh"
                />
                {showDirections && (
                    <MapViewDirections
                        origin={{ latitude: 22.701384, longitude: 75.867401 }}
                        destination={destination}
                        apikey="AIzaSyBQDSvBppnW59UJ0ALOlGV5aMiJl6bgk70"
                        strokeWidth={5}
                        strokeColor="blue"
                    />
                )}
            </MapView>
            <TouchableOpacity
                onPress={handleGetDirections}
                style={styles.buttonContainer}>
                <Text>Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleGoBack}
                style={styles.backButton}>
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
    },
});

export default MapScreen;
