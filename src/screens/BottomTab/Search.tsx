import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchIcon from '../../assets/svg/search.svg';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from '../../configs/ProfileHeader';
import Pin from '../../assets/svg/Pin.svg';
import User from '../../assets/svg/user.svg';
import Down from '../../assets/svg/BlackDown.svg';

export default function Search() {
  const navigation = useNavigation();

  const renderList = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.PLACE_DETAILS);
      }}
      style={[styles.shadow, styles.itemContainer]}
    >
      <Image
        source={item.img}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <Text style={styles.itemTitle}>
        {item.title}
      </Text>
      <View style={styles.detailsContainer}>
        <Pin />
        <Text style={styles.itemDetails}>
          {item.details}
        </Text>
      </View>
      <View style={styles.userContainer}>
        <View style={styles.userTextContainer}>
          <Text style={styles.itemUser}>
            {item.user}
          </Text>
          <User />
          <Down />
        </View>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.updateButton}
        >
          <Text style={styles.updateButtonText}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={item.subTime}
        horizontal
        renderItem={({ item, index }) => (
          <View style={styles.subTimeContainer}>
            <Text style={styles.subTimeText}>
              {item.time}
            </Text>
          </View>
        )}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader titile="Search" width={30} />
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <SearchIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#000'}
              style={styles.searchInput}
            />
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={Post}
          renderItem={renderList}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    height: hp(40),
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  itemImage: {
    height: hp(20),
    width: '100%',
  },
  itemTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  itemDetails: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#777777',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  userTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemUser: {
    fontFamily: 'Federo-Regular',
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
  updateButton: {
    borderBottomWidth: 1,
  },
  updateButtonText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  subTimeContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    marginTop: 20,
    borderWidth: 1,
    height: 30,
    borderRadius: 30,
    marginLeft: 10,
  },
  subTimeText: {
    fontFamily: 'Federo-Regular',
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
  searchContainer: {
    marginTop: 10,
    height: hp(8),
    justifyContent: 'center',
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
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
});

const Post = [
  {
    title: 'Marrakech: Agafay Desert Tour with Quad',
    details: '192 Rue Tachenbacht, Marrakech 40000',
    img: require('../../assets/Cropping/img1.png'),
    user: 'Today 2',
    subTime: Array(5).fill({ time: '08:10PM' }),
  },
  {
    title: 'Marrakech: Agafay Desert Tour with Quad',
    details: '192 Rue Tachenbacht, Marrakech 40000',
    img: require('../../assets/Cropping/img1.png'),
    user: 'Today 2',
    subTime: Array(5).fill({ time: '08:10PM' }),
  },
];
