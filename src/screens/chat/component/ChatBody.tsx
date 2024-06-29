import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ChatBody({ item }) {
  const user = useSelector(state => state.auth.userData);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  const chatId = `${user?.id}${item?.id}`;

  useEffect(() => {
    const fetchMessages = async () => {
      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('message')
        .orderBy('createdAt', 'asc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Clear previous messages before updating with new ones
          setMessages([]);
          setMessages(messages);

          // Set loading to false after a minimum duration (e.g., 2 seconds)
          setTimeout(() => {
            setLoading(false);
          }, 2000); // Adjust the delay as needed
        });

      return () => unsubscribe();
    };

    fetchMessages();
  }, [user?.id, item?.id]);

  const MessageItem = ({ message }) => {
    const isSender = message.sender_id === user?.id;
    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderMessage : styles.receiverMessage,
        ]}
      >
        {!isSender && <Image source={require('../../../assets/Cropping/img3.png')} style={styles.avatar} />}
        <View
          style={[
            styles.messageContent,
            isSender ? styles.senderContent : styles.receiverContent,
          ]}
        >
          {message.image ? (
            <Image source={{ uri: message.image }} style={styles.messageImage} />
          ) : (
            <Text style={isSender ? styles.senderText : styles.receiverText}>
              {message.text}
            </Text>
          )}
        </View>
        {isSender && <Image source={require('../../../assets/Cropping/img3.png')} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <View style={styles.ListContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : messages.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          ListFooterComponent={<View style={{ height: hp(5) }} />}
        />
      ) : (
        <View style={styles.noMessagesContainer}>
          <Text>No messages found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  senderContent: {
    marginLeft: '20%',
    backgroundColor: '#E5E5EA',
  },
  receiverContent: {
    marginRight: '20%',
    backgroundColor: '#000',
  },
  senderText: {
    fontSize: 16,
    color: '#1E1E1E',
    marginHorizontal: 5,
  },
  receiverText: {
    fontSize: 16,
    color: '#FFF',
    marginHorizontal: 5,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  messageContent: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ListContainer: {
    flex: 1,
    paddingVertical: 10,
  },
});
