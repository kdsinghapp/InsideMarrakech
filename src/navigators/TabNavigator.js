import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import _routes from '../routes/routes';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const user = useSelector(state => state.auth.userData);
  const BottomTabConfig = user.type === 'Company' ? _routes.BOTTOMTAB_ROUTE_COMPANY : _routes.BOTTOMTAB_ROUTE_USER;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
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
                      width:screen.lable == ''?60:30,
                      height:screen.lable == ''?60: 30,
                      marginTop:screen.lable == ''?-15:0,
                    }}
                  />
                ) : (
                  <Image
                    source={screen.logo}
                    style={{
                      width:screen.lable == ''?60:30,
                      height:screen.lable == ''?60: 30,
                      marginTop:screen.lable == ''?-15:0,
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
  );
}

