import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import RegistrationRoutes from './RegistrationRoutes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../redux/Store';
import toastConfig from '../configs/customToast';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from '../utils/Localization';
import { LanguageProvider } from '../utils/LanguageContext';
import { LocationProvider } from '../configs/LocationContext';
import InternetConnectionCheck from '../configs/ConnectionCheck';
import { firebase } from '@react-native-firebase/analytics';

export default function AppNavigator() {

  useEffect(()=>{
    
    const handleLanguage =async () => {
      await firebase.analytics().setAnalyticsCollectionEnabled(true);
   const language = await AsyncStorage.getItem("Lng")

    localizationStrings.setLanguage(language);

    }
    handleLanguage();
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
        <InternetConnectionCheck>
        <LocationProvider>
        <LanguageProvider>
          <NavigationContainer>
            <RegistrationRoutes />
            <Toast config={toastConfig} />
          </NavigationContainer>
            </LanguageProvider>
            </LocationProvider>
            </InternetConnectionCheck>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
