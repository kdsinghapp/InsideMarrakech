import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  Settings,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loading from '../../configs/Loader';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useDispatch, useSelector} from 'react-redux';
import {get_profile, logout} from '../../redux/feature/authSlice';
import localizationStrings from '../../utils/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.auth.isLoading);
  const isFacuse = useIsFocused();
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const [value, setValue] = useState('en');
  const [items] = useState([
    { label: 'English', value: 'English' },
    { label: 'French', value: 'French' },
    // Add more languages here
  ]);
  const handleChangeLanguage =async (language) => {
    localizationStrings.setLanguage(language);
    await AsyncStorage.setItem("Lng", language)


    setValue(language);
  };
  useEffect(() => {
    get_userprofile();
  }, [user, isFacuse]);

  const get_userprofile = () => {
    const params = {
      user_id: user?.id,
    };
    dispatch(get_profile(params));
  };

  const user_Logout = () => {
    setIsVisible(false);
    const params = {
      data: {user_id: user?.id},
      navigation: navigation,
    };
    dispatch(logout(params));
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.screen);
        }}
        style={{
          height: 45,
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          //backgroundColor: '#FAFAFA',
          borderBottomWidth: 1,
          borderColor: '#E3E3E3',
          alignItems: 'center',
          paddingHorizontal: 0,
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            lineHeight: 14,
            fontWeight: '500',
            fontFamily: 'Federo-Regular',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
      {isLoading ? <Loading /> : null}

      {Platform.OS === 'ios' ? (
        <View style={{height: 68}} />
      ) : (
        <View style={{height: 5}} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: hp(5), marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              lineHeight: 30,
              fontWeight: '600',
              fontFamily: 'Federo-Regular',
            }}>
           {localizationStrings.Profile}
          </Text>
        </View>
        <View style={{height: hp(5), marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              lineHeight: 30,
              fontWeight: '600',
              fontFamily: 'Federo-Regular',
            }}>
            {localizationStrings.Account}
          </Text>
        </View>

        <View style={{}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={Account}
            renderItem={renderItem}
          />
        </View>
        <View style={{height: hp(5), marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              lineHeight: 30,
              fontFamily: 'Federo-Regular',
              fontWeight: '600',
            }}>
            {localizationStrings.setting}
          </Text>
        </View>

        <View style={{}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={Setting}
            renderItem={renderItem}
          />
        </View>
        <View style={{height: hp(5), marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              lineHeight: 30,
              fontWeight: '600',
              fontFamily: 'Federo-Regular',
            }}>
            {localizationStrings.about}
          </Text>
        </View>

        <View style={{}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={About}
            renderItem={renderItem}
          />
        </View>
        <Dropdown
        style={styles.dropdown}
        data={items}
        labelField="label"
        valueField="value"
        placeholder="Select Language"
        value={value}
        
        onChange={item => handleChangeLanguage(item.value)}
      />
  
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          style={{
            height:55,
            marginTop: 15,
            //backgroundColor: '#FAFAFA',
            // alignItems: 'center',
            borderTopWidth:0.4,
            justifyContent: 'center',
           
          }}>
          <Text
            style={{
              color: '#FF0000',
              fontSize: 14,
              lineHeight: 21,
              fontWeight: '600',
              fontFamily: 'Federo-Regular',
            }}>
            {localizationStrings.logout}
          </Text>
        </TouchableOpacity>


        <Modal visible={isVisible} animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',

                borderRadius: 20,
                width: '90%',
                height: hp(35),
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                }}
                style={{height: 25, width: 25, alignSelf: 'flex-end'}}>
                <Image
                source={require('../../assets/Cropping/Close2x.png')}
                style={{height: 24, width: 24}}
              />
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: hp(20),
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 24,
                    lineHeight: 36,
                    color: '#000',
                    fontFamily: 'Federo-Regular',
                  }}>
                  {localizationStrings.logout}?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 20,
                  }}>
                  <View style={{height: hp(5)}}>
                    <Text
                      style={{
                        color: '#9DB2BF',
                        fontSize: 16,
                        lineHeight: 24,
                        fontWeight: '400',
                        fontFamily: 'Federo-Regular',
                      }}>
                      {localizationStrings.logout_msg}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  user_Logout();
                }}
                style={{
                  width: 225,
                  alignSelf: 'center',
                  backgroundColor: '#1D0B38',
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 12,
                    lineHeight: 18,
                    color: '#fff',
                    fontFamily: 'Federo-Regular',
                  }}>
                 {localizationStrings.logout}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  dropdown: {
   
    height:40,
justifyContent:'center',
    width:'100%',
    alignSelf:'center',
    backgroundColor:'#fff',
   
  
  },
})
const Account = [
  {
    name: `${localizationStrings.Edit_profile}`,

    screen: ScreenNameEnum.EDIT_PROFILE,
  },

  {
    name: `${localizationStrings.Change_pass}`,

    screen: ScreenNameEnum.CHANGE_PASSWORD,
  },

  // {
  //   name: 'WishList',

  //   screen: ScreenNameEnum.WISHLIST_SCREEN,
  // },
  {
    name: `${localizationStrings.Booking_tab}`,

    screen: ScreenNameEnum.BOOKING_SCREEN,
  },
  {
    name: `${localizationStrings.subscription}`,

    screen: ScreenNameEnum.SUBSCRIPTION_SCREEN,
  },
  {
    name: `${localizationStrings.notification}`,

    screen: ScreenNameEnum.NOTIFICATION_SCREEN,
  },
];
const Setting = [
  {
    name:`${localizationStrings.faq}`,

    screen: ScreenNameEnum.FAQ_SCREEN,
  },
  {
    name: `${localizationStrings.about_us}`,

    screen: ScreenNameEnum.ABOUT_US,
  },
 
];

const About = [
  {
    name: `${localizationStrings.Privacy_policy}`,

    screen: ScreenNameEnum.PRIVACY_POLICY,
  },
  {
    name: `${localizationStrings.tern_con}`,

    screen: ScreenNameEnum.TERM_CONDITION,
  },
];
