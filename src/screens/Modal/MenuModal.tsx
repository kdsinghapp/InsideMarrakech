import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get_property_menu } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

const MenuModal = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const menu = useSelector(state => state.feature.MenuList);
  const [isVisible, setIsVisible] = useState(false);

  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
const navigation = useNavigation()
  useEffect(() => {
   getMenu()
    
  }, [isFocused,user]);


  console.log('==============menu======================');
  console.log(menu);
  console.log('====================================');
const getMenu =()=>{
const params ={
    // id:data.id
    id:'1'
}
dispatch(get_property_menu(params))
}

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal visible={visible} transparent>
    
      <View
       
        activeOpacity={1}
        style={styles.container}
      >
        {isLoading?<Loading />:null}
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY: translateY }],
            },
          ]}
        >
            <View style={{flexDirection:'row',
            paddingHorizontal:20,
            justifyContent:'space-between',alignItems:'center'}}>
            <Text style={[styles.title,{width:'15%'}]}></Text>
            <Text style={styles.title}>Menu</Text>
          <TouchableOpacity
          onPress={()=>{
            onClose()
          }}
          style={{ alignItems:'flex-end',marginRight:20}}>
<Image  source={require('../../assets/Cropping/Close2x.png')}  style={{height:30,width:30}}/>
          </TouchableOpacity>

         
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 15 }}>
            
            <View style={styles.optionContainer}>
           {menu &&   <FlatList
                data={menu}
              
                showsVerticalScrollIndicator={false}
                ListFooterComponent={({item})=>(
                    <View  style={{height:hp(15)}}/>
                )}
                renderItem={({ item, index }) => (
                  <View style={{
                    height:hp(60),
                  marginVertical:10,
                  width:wp(100)}}>
                    <Image  
                    resizeMode='contain'
                    source={{uri:item.image}}
                    style={{height:'100%',width:'100%'}}
                    />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />}
            </View>
          
           
          </View>

          
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    paddingTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop:hp(20),
    minHeight: hp(80),
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Federo-Regular',
  },
  optionContainer: {
    marginTop: 10,
  },
  dateOption: {
    borderWidth: 1,
    paddingVertical: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  guestOption: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 5,
    flexDirection: 'row',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginRight: 10,
  },
  guestIcon: {
    height: 20,
    width: 20,
  },
  searchButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 55,
    width: '100%',
    marginTop: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  selectedOption: {
    backgroundColor: '#000',
  },
  selectedText: {
    color: '#FFF',
  },
});

export default MenuModal;


