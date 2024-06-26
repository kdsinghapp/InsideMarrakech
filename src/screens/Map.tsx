import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const MapScreen = () => {
    const [destination, setDestination] = useState({
        latitude: 22.719568,
        longitude: 75.857727,
    });
    const [currentLocation, setCurrentLocation] = useState(null);
    const [showDirections, setShowDirections] = useState(false);
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const [compassEnabled, setCompassEnabled] = useState(true);
 
    useEffect(() => {
        // Fetch current location initially
        const fetchCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                  
                    setCurrentLocation({ latitude, longitude });
          
                },
                error => {
                    console.log(error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        // Set interval to update location every 10 seconds (adjust as needed)
        const intervalId = setInterval(fetchCurrentLocation, 10000);

        // Fetch initial location
        fetchCurrentLocation();
        handleGetDirections()

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleGetDirections = () => {
        setShowDirections(true);
        if (mapRef.current && currentLocation) {
            mapRef.current.animateCamera({
                center: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                },
                pitch:0,
                heading: 0, // Set heading to 0 to north
                zoom: 17, // Adjust zoom level as needed
            });
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <MapView
                    ref={mapRef}
                provider={PROVIDER_GOOGLE}
                
                style={styles.map}
                initialRegion={{
                    latitude: currentLocation ? currentLocation.latitude : 22.701384,
                    longitude: currentLocation ? currentLocation.longitude : 75.867401,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  
                }}
              scrollDuringRotateOrZoomEnabled={true}
              
    
                mapType='satellite'
            >
                {currentLocation && (
                    <Marker
                        coordinate={currentLocation}
                        title="Current Location"
                        description="You are here"
                        pinColor="blue"
                        
                    />
                )}
                <Marker
                    coordinate={destination}
                    title="Destination"
                    description="Sapna Sangeeta Rd, Snehnagar, Indore, Madhya Pradesh"
                />
                {showDirections && currentLocation && (
                    <MapViewDirections
                        origin={currentLocation}
                        destination={destination}
                        apikey={process.env.GOOGLE_PLACES_API_KEY}
                        strokeWidth={5}
                        strokeColor="#559cee"
                        onError={errorMessage => {
                            console.error('GOT AN ERROR', errorMessage);
                          }}
                    />
                )}
            </MapView>
            <TouchableOpacity
                onPress={handleGetDirections}
                style={styles.buttonContainer}>
                <Text style={{fontSize:14,color:'#000',fontWeight:'500'}}>Get Directions</Text>
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
        backgroundColor: '#d4eeef',
        padding: 10,
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:50
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
