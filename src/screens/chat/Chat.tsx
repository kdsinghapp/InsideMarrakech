import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './component/ChatHeader';
import ChatBody from './component/ChatBody';
import ChatFooter from './component/ChatFooter';
import { get_profile } from '../../redux/feature/authSlice';

export default function Chat({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.userData);
  const chatUser = useSelector(state => state.auth.Update_user);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      get_userprofile();
    }
  }, [isFocused]);

  const get_userprofile = () => {
    const params = {
      user_id: item?.id,
    };
    dispatch(get_profile(params));
  };

  return (
    <View style={styles.container}>
      <ChatHeader item={chatUser} />
      <ChatBody item={chatUser} />
      <ChatFooter item={chatUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
