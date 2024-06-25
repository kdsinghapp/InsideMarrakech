
import { View, Text, Image, Keyboard, Platform, KeyboardAvoidingView, } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import localizationStrings from '../utils/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageContext from '../utils/LanguageContext';
import ScreenNameEnum from '../routes/screenName.enum';
import Home from '../screens/BottomTab/Home';
import Search from '../screens/BottomTab/Search';
import Booking from '../screens/BottomTab/Booking';
import Profile from '../screens/BottomTab/Profile';
import CompanyBooking from '../screens/company/CompanyBooking';
import AddProperty from '../screens/company/AddProperty';
import ChatPage from '../screens/chat/ChatPage';
import CProfile from '../screens/company/CProfile';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { language } = useContext(LanguageContext); // Access language from context
  const BOTTOMTAB_ROUTE_USER = [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component: Home,
      logo: require('../assets/Cropping/Home1.png'),
      lable: localizationStrings.Home,
      logo2: require('../assets/Cropping/Home2x.png'),
    },
    {
      name: ScreenNameEnum.SEARCH_SCREEN,
      Component: Search,
      logo: require('../assets/Cropping/Search2x.png'),
      logo2: require('../assets/Cropping/Search2x.png'),
      lable: localizationStrings.search,
    },

    {
      name: ScreenNameEnum.BOOKING_SCREEN,
      Component: Booking,
      logo: require('../assets/Cropping/Booking2x.png'),
      logo2: require('../assets/Cropping/BookingActive2.png'),
      lable: localizationStrings.Booking,
    },

    {
      name: ScreenNameEnum.PROFILE_SCREEN,
      Component: Profile,
      logo: require('../assets/Cropping/Profile2x.png'),
      logo2: require('../assets/Cropping/ProfileActive2.png'),
      lable: localizationStrings.Profile,
    },


  ]
  const BOTTOMTAB_ROUTE_COMPANY = [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component: Home,
      logo: require('../assets/Cropping/Home1.png'),
      lable: localizationStrings.Home,
      logo2: require('../assets/Cropping/Home2x.png'),
    },


    {
      name: ScreenNameEnum.CompanyBooking,
      Component: CompanyBooking,
      logo: require('../assets/Cropping/bag-2.png'),
      logo2: require('../assets/Cropping/bag-2a.png'),
      lable: localizationStrings.Booking,
    },

    {
      name: ScreenNameEnum.ADD_PROPERTY,
      Component: AddProperty,
      logo: require('../assets/Cropping/Cadd.png'),
      logo2: require('../assets/Cropping/Cadd.png'),
      lable: ''
    },
    {
      name: ScreenNameEnum.CHAT_CONTACT_SCREEN,
      Component: ChatPage,
      logo: require('../assets/Cropping/message-notif.png'),
      logo2: require('../assets/Cropping/Chats_1.png'),
      lable: localizationStrings.messages,
    },
    {
      name: ScreenNameEnum.CProfile,
      Component: CProfile,
      logo: require('../assets/Cropping/Profile2x.png'),
      logo2: require('../assets/Cropping/ProfileActive2.png'),
      lable: localizationStrings.Profile,
    },


  ]
  const user = useSelector(state => state.auth.userData);
  const BottomTabConfig = user?.type === 'Company' ? BOTTOMTAB_ROUTE_COMPANY : BOTTOMTAB_ROUTE_USER;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const isFocuse = useIsFocused()

  useEffect(() => {
    const handleLanguage = async () => {
      const language = await AsyncStorage.getItem("Lng")
      console.log('language', language);
      localizationStrings.setLanguage(language);

    }
    handleLanguage();
  }, [])
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 65,
            display: isKeyboardVisible ? 'none' : 'flex', // Hide tab bar when keyboard is visible
          },
        }}
      >
        {BottomTabConfig.map(screen => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.Component}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <>
                  {focused ? (
                    <Image
                      source={screen.logo2}
                      style={{
                        width: screen.lable == '' ? 60 : 30,
                        height: screen.lable == '' ? 60 : 30,
                        marginTop: screen.lable == '' ? -15 : 0,
                      }}
                    />
                  ) : (
                    <Image
                      source={screen.logo}
                      style={{
                        width: screen.lable == '' ? 60 : 30,
                        height: screen.lable == '' ? 60 : 30,
                        marginTop: screen.lable == '' ? -15 : 0,
                        tintColor: focused && '#000',
                      }}
                    />
                  )}
                  <Text style={{ fontFamily: 'Federo-Regular', color: focused ? '#000' : color, fontSize:11, fontWeight: '600' }}>{screen.lable}</Text>
                </>
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
}
