import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import _routes from '../routes/routes';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 65,
        },
      }}>
      {_routes.BOTTOMTAB_ROUTE.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          
          component={screen.Component}
          options={{
          
            tabBarIcon: ({focused, color, size}) => (
              <>
                { focused ? (
                    <Image
                      source={screen.logo2}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                  ) : (
                    <Image
                      source={screen.logo}
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: focused &&'#000' 
                      }} // Adjust size and style as needed
                    />
                  )
                }
              <Text style={{color:focused?'#000':color,fontSize:12,fontWeight:'600'}}>{screen.lable}</Text> 
              </>
            ),
            
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
