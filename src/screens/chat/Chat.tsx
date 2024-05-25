import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ChatHeader from './component/ChatHeader';
import ChatBody from './component/ChatBody';
import ChatFooter from './component/ChatFooter';

export default function Chat({route}) {
  const {item} = route.params;
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.userData);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <View style={styles.container}>
      
        <ChatHeader item={item} />
        <ChatBody />
        <ChatFooter />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
