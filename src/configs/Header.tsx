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
import { getCurrentLocation, locationPermission } from './helperFunction'
import { useSelector } from 'react-redux'
export default function Header() {
  const [origin, setOrigin] = useState({ latitude: 22.701384, longitude: 75.867401 });
  const [locationName, setLocationName] = useState('');
  const user = useSelector(state => state.auth.userData);
  useEffect(() => {
    
    getLiveLocation()

  }, [user])
  function findCityName(response) {
    const results = response.results;
    for (let i = 0; i < results.length; i++) {
      const addressComponents = results[i].address_components;
      for (let j = 0; j < addressComponents.length; j++) {
        const types = addressComponents[j].types;
        if (types.includes('locality') || types.includes('administrative_area_level_2')) {
          return addressComponents[j].long_name; // Return the city name
        }
      }
    }
    return null; // Return null if city name not found
  }


  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {

      const { latitude, longitude } = await getCurrentLocation();
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log(json);
        setLocationName(json)


      } catch (e) {
        console.log("e", e)
      } finally {

      }
    }
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
  <Text style={{fontFamily: 'Federo-Regular',fontSize:14,fontWeight:'500',color:'#000',marginHorizontal:5}}> {locationName == '' ? 'fetching..' : findCityName(locationName)}</Text>
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