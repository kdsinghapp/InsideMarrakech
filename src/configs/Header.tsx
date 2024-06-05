import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp  } from 'react-native-responsive-screen'
import Pin from '../assets/svg/Pin.svg'
import Down from '../assets/svg/Down.svg'
import Msg from '../assets/svg/Msg.svg'
import Bell from '../assets/svg/Bell.svg'
import { useNavigation } from '@react-navigation/native'
import ScreenNameEnum from '../routes/screenName.enum'
import localizationStrings from '../utils/Localization'
export default function Header() {

  const navigation = useNavigation()
  return (
    <View style={{height:hp(10),flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',paddingHorizontal:15}}>
   <View style={{}}>
    <Text style={{fontFamily: 'Federo-Regular',fontSize:12,fontWeight:'500',color:'#000'}}>{localizationStrings.current_location}</Text>
<View style={{flexDirection:'row'}}>
  <Pin />
  <Text style={{fontFamily: 'Federo-Regular',fontSize:14,fontWeight:'500',color:'#000',marginHorizontal:2}}>Marrakesh</Text>
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