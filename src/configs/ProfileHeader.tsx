import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RightArrow from '../assets/svg/RightArrow.svg';
import {useNavigation} from '@react-navigation/native';
export default function ProfileHeader({titile = '',width=20}) {
  const navigation = useNavigation();
  return (
    <View style={{height: hp(8), alignItems: 'center', flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <RightArrow height={15} Width={15} />
        <Text style={{fontSize: 14, color: '#000', fontWeight: '500'}}>
          Back
        </Text>
      </TouchableOpacity>

      <View style={{alignSelf: 'center', marginLeft: wp(width)}}>
        <Text style={{fontSize: 20, color: '#000', fontWeight: '500'}}>
          {titile}
        </Text>
      </View>
    </View>
  );
}
