import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

export default function SplashScreen() {
  const navigation = useNavigation();
  const isLogOut = useSelector((state: RootState) => state.auth.isLogOut);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const isFoucs = useIsFocused();

  const checkLogout = () => {
    console.log('================checkLogout===========isLogOut=========', isLogOut);
    console.log('================checkLogout===========isLogin=========', isLogin);
    if (!isLogOut && !isLogin || isLogOut && !isLogin) {
      console.log('================Login====================');
      navigation.navigate(ScreenNameEnum.LOGIN_OPTION);
    }
    if (!isLogOut && isLogin) {
      console.log('================HomeTab====================');
      navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
    }
  };

  useEffect(() => {
    checkLogout();
  }, [isFoucs, isLogOut]);

  return (
    <View
     
      style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff'}}>
      <Image
        source={require('../assets/Cropping/Logo3x.png')}
        style={{height: 180, width: 180}}
        resizeMode="contain"
      />
    </View>
  );
}
