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
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';

import Back from '../../assets/svg/back.svg';
import Emoji from '../../assets/svg/Emoji.svg';
import Gallery from '../../assets/svg/Gallery.svg';
import Send from '../../assets/svg/send.svg';
import {matrixTransform} from 'react-native-svg/lib/typescript/elements/Shape';
export default function Chat({route}) {
  const {item} = route.params;
  const navigation = useNavigation();
  const MessageItem = ({message}) => {
    const isSender = message.sender === 'Alice';
    return (
      <View style={[{flexDirection: 'row', alignItems: 'center', padding: 10,alignSelf:isSender ?'flex-end':'flex-start'},  ]}>
        {!isSender && (
          <Image
            source={item.img}
            style={{height: 30, width: 30, borderRadius: 15, marginRight: 10}}
          />
        )}
        <View
          style={[
            styles.messageContainer,
            isSender ? styles.senderMessage : styles.receiverMessage,
          ]}>
          <Text
            style={
              isSender ? styles.messageTextSender : styles.messageTextreceiver
            }>
            {message.text}
          </Text>
        </View>
        {isSender && (
          <Image
            source={item.img}
            style={{height: 30, width: 30, borderRadius: 15, marginLeft: 10}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
     
        <View style={styles.colorDiv}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <TouchableOpacity  
            onPress={()=>{
                navigation.goBack()
            }}
            >
              <Image
              style={{height:20,width:20,marginLeft:20}}
              
              
              source={require('../../assets/Cropping/Back_Nav3x.png')} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <Image
                source={item.img}
                style={{height: 40, width: 40, borderRadius: 20}}
              />

              <View style={{marginLeft: 15}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 17,
                    lineHeight: 32,
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFDF5',
            marginTop: 20,
            paddingHorizontal: 10,
          }}>
          <FlatList
            data={messages}
            renderItem={({item}) => <MessageItem message={item} />}
           
          />

          
        </View>
        
      </ScrollView>
      <View style={{justifyContent:'center',paddingHorizontal:20,bottom:5}}>
<View style={{flexDirection:'row',alignItems:'center',
justifyContent:'space-between',
backgroundColor:'#F6F6F6',height:60,borderRadius:30,paddingLeft:20}}>
  <TouchableOpacity>
<Emoji />
</TouchableOpacity>
<View style={{width:'60%'}}>
<TextInput  
multiline
placeholder='Type...'
placeholderTextColor={'#A8A8A8'}
style={{marginLeft:10}}
/>
</View>
<TouchableOpacity>
<Gallery  />
</TouchableOpacity>
<TouchableOpacity>
<Send />
</TouchableOpacity>
</View>


          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E5E5EA',
  },
  receiverMessage: {
    alignSelf: 'flex-start',

    backgroundColor: '#000',
  },
  messageTextSender: {
    fontSize: 16,
    color: '#1E1E1E',
    marginHorizontal: 5,
  },
  messageTextreceiver: {
    fontSize: 16,
    color: '#FFF',
    marginHorizontal: 5,
  },
  txt: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: '#000',
    marginHorizontal: 10,
  },
  shdow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  colorDiv: {
    backgroundColor: '#FFF',
    height: hp(12),
    borderBottomRightRadius:30,
    borderBottomLeftRadius: 30,
  },
  search: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 15,
  },
});

const messages = [
  {id: '1', sender: 'Alice', text: 'Hi there!'},
  {id: '2', sender: 'Bob', text: 'Hey, how are you?'},
  {id: '3', sender: 'Alice', text: "I'm doing well, thanks for asking!"},
  {id: '4', sender: 'Bob', text: 'Good to hear!'},
  {id: '1', sender: 'Alice', text: 'Hi there!'},
  {id: '2', sender: 'Bob', text: 'Hey, how are you?'},
  {id: '3', sender: 'Alice', text: "I'm doing well, thanks for asking!"},
  {id: '4', sender: 'Bob', text: 'Good to hear!'},
  {id: '1', sender: 'Alice', text: 'Hi there!'},
  {id: '2', sender: 'Bob', text: 'Hey, how are you?'},
  {id: '3', sender: 'Alice', text: "I'm doing well, thanks for asking!"},
  {id: '4', sender: 'Bob', text: 'Good to hear!'},
  {id: '1', sender: 'Alice', text: 'Hi there!'},
  {id: '2', sender: 'Bob', text: 'Hey, how are you?'},
  {id: '3', sender: 'Alice', text: "I'm doing well, thanks for asking!"},
  {id: '4', sender: 'Bob', text: 'Good to hear!'},
  {id: '1', sender: 'Alice', text: 'Hi there!'},
  {id: '2', sender: 'Bob', text: 'Hey, how are you?'},
  {id: '3', sender: 'Alice', text: "I'm doing well, thanks for asking!"},
  {id: '4', sender: 'Bob', text: 'Good to hear!'},
  {id: '1', sender: 'Alice', text: 'Hi there!'},
  {id: '2', sender: 'Bob', text: 'Hey, how are you?'},
  {id: '3', sender: 'Alice', text: "I'm doing well, thanks for asking!"},
  {id: '4', sender: 'Bob', text: 'Good to hear!'},
  // Add more messages as needed
];
