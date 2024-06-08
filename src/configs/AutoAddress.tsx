import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Vibration, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const requestLocationPermission = async ({ onPlaceSelected,placeholder }) => {
    const [PickupLocationlat, setPickupLocationlat] = useState({
        lat: '',
        lng: '',
        place: ''
    });

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const GooglePlacesInput = ({placeholder}) => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={{borderRadius:30,flexDirection:'row',alignItems:'center',}}>
    <GooglePlacesAutocomplete
   
    fetchDetails={true}
    GooglePlacesDetailsQuery={{ fields: 'geometry' }}
    placeholder={placeholder}
    onFail={error => console.log(error)}
    onNotFound={() => console.log('no results')}
    onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        try{
        console.log('onPlaceSelected=>>>>>>>>',data, details);
       // onPlaceSelected(details);
        }
        catch(err){
          console.log('map',err);
          
        }
      }}
    styles={{
        description: {
            fontWeight: 'bold',
            color: 'black',
            width: '90%',
           
        },
        container: {
          
        marginHorizontal:10,
        marginTop:10,
           
        
        },
        textInput: {
            fontSize: 13,
            color: '#000',
            height: '100%',
            width: '90%',
            borderWidth:1,borderRadius:30,
           

           
        },
    }}
    textInputProps={{
        placeholderTextColor: "#000"
    }}
    query={{
        key: 'AIzaSyBQDSvBppnW59UJ0ALOlGV5aMiJl6bgk70',
        language: 'en',
    }}
    // currentLocation={true}
    // currentLocationLabel='Current location'
    enablePoweredByContainer={false}

    
/>

</View>
  );
};

export default GooglePlacesInput;
