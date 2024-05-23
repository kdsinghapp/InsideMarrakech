import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Back from '../../assets/svg/back.svg';
import Emoji from '../../assets/svg/Emoji.svg';
import Gallery from '../../assets/svg/Gallery.svg';
import Send from '../../assets/svg/send.svg';

export default function Chat({route}) {
  const {item} = route.params;
  const navigation = useNavigation();

  const MessageItem = ({message}) => {
    const isSender = message.sender === 'Alice';
    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderMessage : styles.receiverMessage,
        ]}>
        {!isSender && <Image source={item.img} style={styles.avatar} />}
        <View
          style={[
            styles.messageContent,
            isSender ? styles.senderContent : styles.receiverContent,
          ]}>
          <Text style={isSender ? styles.senderText : styles.receiverText}>
            {message.text}
          </Text>
        </View>
        {isSender && <Image source={item.img} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.colorDiv}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/Cropping/Back_Nav3x.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Image source={item.img} style={styles.headerAvatar} />
          <Text style={styles.headerText}>{item.name}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.messageContainer}>
          <FlatList
            data={messages}
            renderItem={({item}) => <MessageItem message={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Emoji />
        </TouchableOpacity>
        <TextInput
          multiline
          placeholder="Type..."
          placeholderTextColor="#A8A8A8"
          style={styles.input}
        />
        <TouchableOpacity style={styles.iconButton}>
          <Gallery />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Send />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  colorDiv: {
    backgroundColor: '#FFF',
    height: hp(12),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 20,
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  headerContent: {
    flexDirection: 'row',

    alignItems: 'center',
    marginLeft: 20,
  },
  headerAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 32,
    color: '#000',
    marginLeft: 15,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContent: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,

    marginRight: 10,
    marginLeft: 10,
  },

  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    bottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    height: 60,
    borderRadius: 30,
    paddingLeft: 20,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  input: {
    width: '60%',
    marginLeft: 10,
  },
});

const messages = [
  {id: '1', sender: 'Alice', text: 'Hi there!'},
  {id: '2', sender: 'Bob', text: 'Hey, how are you?'},
  {id: '3', sender: 'Alice', text: "I'm doing well, thanks for asking!"},
  {id: '4', sender: 'Bob', text: 'Good to hear!'},
  // Add more messages as needed
];
