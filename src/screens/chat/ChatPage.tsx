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
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchIcon from '../../assets/svg/search.svg';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from '../../configs/ProfileHeader';

export default function ChatPage() {
  const navigation = useNavigation();
  const RecentListItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.CHAT_SCREEN, {item: item});
      }}
      style={[
        {
          height: hp(10),
          padding: 10,
          marginHorizontal: 15,
          backgroundColor: '#FFF',
          borderRadius: 15,
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}>
      <View style={{}}>
        <Image
          source={item.img}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </View>
      <View style={{width: '65%'}}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 25,
            color: '#000',
          }}>
          {item.name}
        </Text>
        {item.status == 'Typing...' ? (
          <Text
            style={{
              color: '#874BE9',
              fontSize: 14,
              fontWeight: '700',
            }}>
            {item.status}
          </Text>
        ) : (
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {item.status}
          </Text>
        )}
      </View>
      <View style={{}}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: '#B6B6B6',
            lineHeight: 18,
          }}>
          {item.time}
        </Text>
        <View
          style={{
            backgroundColor: '#000',

            height: item.count.length < 2 ? 20 : 25,
            width: item.count.length < 2 ? 20 : 25,
            borderRadius: item.count.length < 2 ? 10 : 12.5,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: item.count.length < 2 ? 12 : 8,
              color: '#FFF',
            }}>
            {item.count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader titile="Message" width={26} />
        <View style={{marginTop: 10, height: hp(8), justifyContent: 'center'}}>
          <View style={[styles.shdow, styles.search]}>
            <SearchIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#000'}
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: '#000',
                lineHeight: 18,
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          <FlatList
            data={data}
            renderItem={RecentListItem}
            keyExtractor={item => item.id}
            ListFooterComponent={({}) => <View style={{height: hp(6)}} />}
          />
        </View>
      </ScrollView>
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
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
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

const data = [
  {
    id: '1',
    name: 'Jenny Wilson',
    time: '08.00pm',
    img: require('../../assets/Cropping/img1.png'),
    status: 'Typing...',
    count: '2',
  },
  {
    id: '2',
    name: 'Emerson',
    time: '08.00pm',
    img: require('../../assets/Cropping/img2.png'),
    status: 'Have you spoken to the delivery...',
    count: '2',
  },
  {
    id: '3',
    name: 'Ruben George',
    time: '08.00pm',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Have you spoken to the delivery...',
    count: '999',
  },
  {
    id: '4',
    name: 'Omar Kenter',
    time: '08.00pm',
    img: require('../../assets/Cropping/img4.png'),
    status: 'Have you spoken to the delivery...',
    count: '2',
  },
  {
    id: '5',
    name: 'Martin Botosh',
    time: '08.00pm',
    img: require('../../assets/Cropping/img5.png'),
    status: 'Have you spoken to the delivery...',
    count: '150',
  },
];
