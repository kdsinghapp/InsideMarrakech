
import { View, Text, Image, Keyboard, Platform ,KeyboardAvoidingView,} from 'react-native';
import React, { useState, useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import localizationStrings from '../utils/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const user = useSelector(state => state.auth.userData);
  const BottomTabConfig = user?.type === 'Company' ? _routes.BOTTOMTAB_ROUTE_COMPANY : _routes.BOTTOMTAB_ROUTE_USER;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const isFocuse= useIsFocused()


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
  useEffect(()=>{
    _get_lan()
  },[isFocuse])
  const _get_lan = async () => {
    const Language = await AsyncStorage.getItem("Lng")
    localizationStrings.setLanguage(Language == null ? "French" : Language);
}
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
                  <Text style={{ fontFamily: 'Federo-Regular', color: focused ? '#000' : color, fontSize: 12, fontWeight: '600' }}>{screen.lable}</Text>
                </>
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
}
