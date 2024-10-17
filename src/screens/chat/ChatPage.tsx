import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SearchIcon from '../../assets/svg/search.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from '../../configs/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_chat_user } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';

export default function ChatPage() {
  const navigation = useNavigation();
  const ChatUser = useSelector(state => state.feature.ChatUser)
  const isLoading = useSelector(state => state.feature.isLoading)
  const user = useSelector(state => state.auth.userData)
  const isFocuse = useIsFocused();
  const dispatch = useDispatch()
  useEffect(() => {

    getChatuser()

  }, [isFocuse, user])


  const getChatuser = async () => {
    const params = {
      user_id: user?.id
    }
    dispatch(get_chat_user(params))

  }

  console.log('ChatUser?.length', ChatUser);


  const RecentListItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.CHAT_SCREEN, { item: item.reciver_data });
      }}
      style={styles.itemContainer}>
      <View>
        <Image source={{ uri: item.reciver_data.image }} style={styles.avatar} />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.reciver_data.first_name} {item.reciver_data.last_name} {!item.reciver_data.last_name && !item.reciver_data.first_name && item.reciver_data.company_name}</Text>

      </View>
    </TouchableOpacity>
  );




  return (
    <View style={styles.container}>

      {isLoading ? <Loading /> : null}

      <ProfileHeader title={localizationStrings.c_contact} width={26} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, styles.shdow]}>
            <SearchIcon />
            <TextInput
              placeholder={localizationStrings.search}
              placeholderTextColor={'#000'}
              style={styles.searchInput}
            />
          </View>
        </View>
        <View style={{}}>
          {ChatUser?.length > 0 ?

            <FlatList
              data={ChatUser}
              renderItem={RecentListItem}

              ListFooterComponent={() => <View style={styles.footer} />
              }
            /> : <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <Text style={{ fontSize: 12, color: "#000", fontWeight: '500', fontFamily: 'Federo-Regular', }}>{localizationStrings?.No_Chat_Contact_Found}</Text>
            </View>

          }
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemContainer: {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    height: hp(10),
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    width: '80%',
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 25,
    fontFamily: 'Federo-Regular',
    color: '#000',
  },
  itemStatus: {
    color: '#874BE9',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Federo-Regular',
  },
  itemTime: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: '#B6B6B6',
    lineHeight: 18,
  },
  notification: {
    backgroundColor: '#000',
    height: 25,
    width: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  singleDigit: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  notificationText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Federo-Regular',
  },
  searchContainer: {
    marginTop: 10,
    height: hp(8),
    justifyContent: 'center',
  },
  searchBox: {
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
    fontFamily: 'Federo-Regular',
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
});

