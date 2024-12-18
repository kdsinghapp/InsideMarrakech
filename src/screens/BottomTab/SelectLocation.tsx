import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistance } from 'geolib';
import localizationStrings from '../../utils/Localization';
import Pin from '../../assets/svg/Pin.svg';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import GooglePlacesInput from '../../configs/AutoAddress';
import { useLocation } from '../../configs/LocationContext';
import { useNavigation } from '@react-navigation/native';
import { errorToast } from '../../configs/customToast';
import ProfileHeader from '../../configs/ProfileHeader';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY // Replace with your actual API key

const SelectLocation = () => {
    const [location, setLocation] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [recentLocations, setRecentLocations] = useState([]);
    const [currentCoords, setCurrentCoords] = useState(null);
    const { setLocationName } = useLocation(); // Get the setLocationName function from context
    const navigation = useNavigation();

    useEffect(() => {
        const loadSavedAddresses = async () => {
            const saved = await AsyncStorage.getItem('savedAddresses');
            if (saved) {
                setSavedAddresses(JSON.parse(saved));
            }
        };

        loadSavedAddresses();

        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                setCurrentCoords({ latitude, longitude });
                fetchNearbyLocations(latitude, longitude);
            },
            error => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    const fetchNearbyLocations = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=200&key=${GOOGLE_PLACES_API_KEY}`
            );
            const data = await response.json();
            setNearbyLocations(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveAddress = useCallback(
        async (address) => {
            // Check if the address already exists in savedAddresses
            const existingAddress = savedAddresses.find(item => item.place_id === address.place_id);
            if (existingAddress) {
               errorToast('This address is already saved.');
               setLocationName(address?.name); // Set the location name in context
               navigation.goBack();
                return;
            }

            const updatedAddresses = [...savedAddresses, address];
            setSavedAddresses(updatedAddresses);
            await AsyncStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
        
            setLocationName(address?.name); // Set the location name in context
            navigation.goBack();
        },
        [savedAddresses, setLocationName, navigation]
    );

    const handleSelectLocation = useCallback(
        (details) => {
            const { lat, lng } = details.geometry.location;
            setLocation({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            const recent = [...recentLocations, details];
            setRecentLocations(recent);
            handleSaveAddress(details); // Save the selected address
            setLocationName(details.name); // Set the location name in context
            navigation.goBack();
        },
        [recentLocations, handleSaveAddress, setLocationName, navigation]
    );

    const renderLocationItem = useCallback(({ item }) => {
        const distance = currentCoords
            ? getDistance(currentCoords, {
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
            })
            : 0;

        const formattedDistance = distance < 1000
            ? `${distance} m`
            : `${(distance / 1000).toFixed(2)} km`;

        return (
            <TouchableOpacity
                onPress={() => handleSaveAddress(item)}
                style={styles.locationItem}
            >
                <View>
                    <Pin />
                    <Text style={{ fontSize: 10, color: '#000', marginTop: 5 }}>{formattedDistance}</Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.locationName}>{item.name}</Text>
                    <Text style={styles.locationAddress}>{item.vicinity}</Text>
                </View>
            </TouchableOpacity>
        );
    }, [currentCoords]);

    return (
        <View style={styles.container}>
           
             <ProfileHeader title={localizationStrings.location} />
       
       
            <View style={{ width: '100%', marginTop: 10, 
       
           }}>
                <GooglePlacesInput placeholder={localizationStrings.search}   onPlaceSelected={handleSelectLocation} />
            </View>
            <View style={styles.savedContainer}>
                <Text style={styles.sectionTitle}>{localizationStrings?.Saved_Addresses}</Text>
                <FlatList
                    data={savedAddresses}
                    renderItem={renderLocationItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.nearbyContainer}>
                <Text style={[styles.sectionTitle, { fontSize: 16, fontWeight: '400', fontFamily: 'Federo-Regular', }]}>{localizationStrings?.near_location}</Text>
               {nearbyLocations && <FlatList
                    data={nearbyLocations} // Show only the first 3 nearby locations
                    renderItem={renderLocationItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
                {nearbyLocations == null &&
                <ActivityIndicator size={20} />

                }
            </View>

            <TouchableOpacity
                style={styles.currentLocationButton}
                onPress={() => {
                    Geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords;
                            setLocation({
                                latitude,
                                longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            });
                            setCurrentCoords({ latitude, longitude });
                            fetchNearbyLocations(latitude, longitude);
                        },
                        error => {
                            console.log(error);
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                }}
            >
             <Pin height={30} width={30} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
     
        backgroundColor: '#fff',
    },
    savedContainer: {
        marginVertical: 10,
     
    },
    nearbyContainer: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '400',
        marginHorizontal: 15,
        marginVertical: 10,
        fontFamily: 'Federo-Regular',
    },
    locationItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationAddress: {
        fontSize: 14,
        color: '#555',
    },
    currentLocationButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#007bff',
        borderRadius: 30,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SelectLocation;
