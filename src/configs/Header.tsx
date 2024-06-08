import { View, Text,TouchableOpacity, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp  } from 'react-native-responsive-screen'
import Pin from '../assets/svg/Pin.svg'
import Down from '../assets/svg/Down.svg'
import Msg from '../assets/svg/Msg.svg'
import Bell from '../assets/svg/Bell.svg'
import { useNavigation } from '@react-navigation/native'
import ScreenNameEnum from '../routes/screenName.enum'
import localizationStrings from '../utils/Localization'
import Geolocation from 'react-native-geolocation-service';
export default function Header() {
  const [origin, setOrigin] = useState({ latitude: 22.701384, longitude: 75.867401 });
  const [locationName, setLocationName] = useState('');


  useEffect(() => {
    requestLocationPermission();
}, []);

const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to show you directions.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getLiveLocation()
                console.log('You can use the location');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

const getLiveLocation = () => {
  Geolocation.getCurrentPosition(
    async (position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setOrigin({ latitude, longitude });

      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBQDSvBppnW59UJ0ALOlGV5aMiJl6bgk70`);
        const responseData = await response.json();

        console.log(responseData, 'responseData');

        if (responseData.results && responseData.results.length > 0) {
          // Extracting the main location from the address components
          const mainLocation = responseData.results[0].address_components.find(component =>
            component.types.includes('locality') || component.types.includes('administrative_area_level_1')
          );
          setLocationName(mainLocation ? mainLocation.long_name : 'Unknown location');

          // Extracting x-goog-maps-metro-area header
          const metroArea = response.headers.map['x-goog-maps-metro-area'];
          console.log('Metro Area:', metroArea);
        } else {
          setLocationName('Unknown location');
        }
      } catch (error) {
        console.error('Geocoding error:', error.message);
        setLocationName('Error retrieving location');
      }
    },
    (error) => {
      console.error(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

  const navigation = useNavigation()
  return (
    <View style={{height:hp(10),flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',paddingHorizontal:15}}>
   <View style={{}}>
    <Text style={{fontFamily: 'Federo-Regular',fontSize:12,fontWeight:'500',color:'#000'}}>{localizationStrings.current_location}</Text>
<View style={{flexDirection:'row'}}>
  <Pin />
  <Text style={{fontFamily: 'Federo-Regular',fontSize:14,fontWeight:'500',color:'#000',marginHorizontal:5}}>{locationName}</Text>
<Down />
</View>
  
   </View>
<View style={{flexDirection:'row',width:'25%',justifyContent:'space-between'}}>
   <TouchableOpacity
   onPress={()=>{
    navigation.navigate(ScreenNameEnum.CHAT_CONTACT_SCREEN)
   }}
   >
    <Msg />
   </TouchableOpacity>
   <TouchableOpacity
   onPress={()=>{
    navigation.navigate(ScreenNameEnum.MsgNotification)
   }}
   >
    <Bell />
   </TouchableOpacity>
   </View>
    </View>
  )
}