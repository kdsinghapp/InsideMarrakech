import { View, Text,Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import ScreenNameEnum from '../routes/screenName.enum'


export default function WellcomeScreen() {

  const navigation = useNavigation()
  return (
    <View style={{
      flex:1,backgroundColor:'#FFF',
    
    }}>
      <ImageBackground 
      source={require('../assets/Cropping/Welcome.png')}
 style={{height:hp(65),width:'100%',marginTop:-28}}
resizeMode='stretch'
      > 
       </ImageBackground>

       <View style={{marginTop:20,height:hp(10),alignItems:'center'}}>
<Text style={{fontSize:24,fontWeight:'500',color:'#000'}}>Welcome to Inside Marrakech</Text>
<Text style={{fontSize:12,fontWeight:'500',color:'#000',marginTop:10}}>The biggest fashion community for inspiration and shopping.</Text>
       </View>
    

    <TouchableOpacity
    
    onPress={()=>{
      navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
    }}
    style={{
      backgroundColor:'#121416',
      height:60,
      marginHorizontal:15,
      borderRadius:30,
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      bottom:20,
      width:'94%'
    }}>

      <Text style={{color:'#FFF',fontSize:20,fontWeight:'600'}}>NEXT</Text>

    </TouchableOpacity>
    </View>
  )
}