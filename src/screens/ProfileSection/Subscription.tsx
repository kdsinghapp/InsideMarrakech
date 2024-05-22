import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';

import ProfileHeader from '../../configs/ProfileHeader';
import Right from '../../assets/svg/Right.svg';
export default function Subscription() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ImageBackground
        source={require('../../assets/Cropping/sub.png')}
        style={{flex: 1}}>
        <ProfileHeader titile="Subscription" width={22} />

        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 22, fontWeight: '500', color: '#000'}}>
            Upgrade to Premium
          </Text>
          <View style={{marginTop:30,height:hp(30)}}>
          <FlatList
            data={subscriptonData}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', alignItems: 'center',height:hp(5),}}>
                <Right />
                <Text style={{fontSize:14, fontWeight: '500', color: '#000',marginLeft:10}}>
                  {item.titile}
                </Text>
              </View>
            )}
          />
          </View>

          <View  style={{height:hp(10)}}>
          <Image
        source={require('../../assets/Cropping/Logo3x.png')}
        style={{height:80, width:80}}
        resizeMode="contain"
      />
          </View>
        </View>

        <TouchableOpacity style={{backgroundColor:'#000',
        position:'absolute',bottom:20,width:'90%',
        height:55,borderRadius:30,marginHorizontal:20,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#FFF',fontSize:18,fontWeight:'600'}}>Upgrade Now</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: '#000',
    marginHorizontal: 10,
  },
  shdow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(12),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  search: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 15,
  },
});

const subscriptonData = [
  {
    id: '1',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
  {
    id: '2',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
  {
    id: '3',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
  {
    id: '4',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
];
