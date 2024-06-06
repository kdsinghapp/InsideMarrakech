import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import ProfileHeader from '../../configs/ProfileHeader';
import Right from '../../assets/svg/Right.svg';
import { useDispatch, useSelector } from 'react-redux';
import { get_subscription } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';

export default function Subscription() {
  const navigation = useNavigation();
const isFocuse = useIsFocused()

  const getSubscription = useSelector(state => state.feature.getSubscription);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_subscription());
  }, [isFocuse]);




  return (
    <View style={styles.container}>
      {isLoading?<Loading  />:null}
      <ImageBackground
        source={require('../../assets/Cropping/sub.png')}
        style={{ flex: 1 }}
      >
        <ProfileHeader title={localizationStrings.subscription} width={22} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{localizationStrings.upgrad_pre}</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={getSubscription}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Right />
                  <Text style={styles.itemText}>{item.name} ({item.type}) {localizationStrings.price}:- $ {item.amount}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Cropping/Logo3x.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>{localizationStrings.up_now}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Federo-Regular',
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    marginTop: 30,
  },
  listContainer: {
    marginTop: 30,
    height: hp(30),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(5),
  },
  itemText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  logoContainer: {
    height: hp(10),
  },
  logo: {
    height: 80,
    width: 80,
  },
  upgradeButton: {
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 20,
    width: '90%',
    height: 55,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeButtonText: {
    fontFamily: 'Federo-Regular',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
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
