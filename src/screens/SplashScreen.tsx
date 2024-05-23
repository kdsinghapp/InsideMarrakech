import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen() {
  const navigation = useNavigation();
  const isLogOut = useSelector((state) => state.auth.isLogOut);
  const isLogin = useSelector((state) => state.auth.isLogin);
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
  }

  useEffect(() => {
    checkLogout();
  }, [isFoucs, isLogOut]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Cropping/Logo3x.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: 180,
    width: 180,
  },
});
