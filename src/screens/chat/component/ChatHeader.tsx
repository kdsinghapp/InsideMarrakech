import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default function ChatHeader({item}) {

    const navigation = useNavigation()
  return (
    <View style={styles.colorDiv}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}>
      <Image
        source={require('../../../assets/Cropping/Back_Nav3x.png')}
        style={styles.backIcon}
      />
    </TouchableOpacity>
    <View style={styles.headerContent}>
      <Image source={item.img} style={styles.headerAvatar} />
      <Text style={styles.headerText}>{item.name}</Text>
    </View>
  </View>
  )
}

const styles =StyleSheet.create({
    headerAvatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
      },
      headerText: {
        fontWeight: '700',
        fontSize: 17,
        lineHeight: 32,
        color: '#000',
        marginLeft: 15,
      },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
      },
    backIcon: {
        height: 20,
        width: 20,
      },
    colorDiv: {
        backgroundColor: '#FFF',
        height: hp(8),
       
        flexDirection: 'row',
        alignItems: 'center',
      
      },
    backButton: {
        marginLeft: 20,
      },
})