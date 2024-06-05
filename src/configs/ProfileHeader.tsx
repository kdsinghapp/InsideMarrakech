import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RightArrow from '../assets/svg/RightArrow.svg';
import {useNavigation} from '@react-navigation/native';
import localizationStrings from '../utils/Localization';
export default function ProfileHeader({title = '',width=20}) {
  const navigation = useNavigation();
  return (
    <View style={{height: hp(8), alignItems: 'center', flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <RightArrow height={15} Width={15} />
        <Text style={{fontFamily: 'Federo-Regular',fontSize: 14, color: '#000', fontWeight: '500'}}>
         {localizationStrings.Back}
        </Text>
      </TouchableOpacity>

      <View style={{alignSelf: 'center', marginLeft: wp(width)}}>
        <Text style={{fontFamily: 'Federo-Regular',fontSize: 20, color: '#000', fontWeight: '500'}}>
          {title}
        </Text>
      </View>
    </View>
  );
}
