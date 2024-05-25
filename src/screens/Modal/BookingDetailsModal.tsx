import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
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
import {styles} from '../../configs/Styles';
const BookingDetailsModal = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user = useSelector(state => state.auth.userData);
    
      const Updated_user = useSelector(state => state.auth.Update_user);
      const isLoading = useSelector(state => state.feature.isLoading);
    
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [dob, setDob] = useState('');
      const [date, setDate] = useState(new Date());
      const [homeTown, setHomeTown] = useState('');
      const [CompanyName, setCompanyName] = useState('');
      const [VatNumber, setVatNumber] = useState('');
      const [CompanyAddress, setCompanyAddress] = useState('');
      const [email, setEmail] = useState('');
      const [mobileNumber, setMobileNumber] = useState('');
      const [profile, setprofile] = useState('');
      const [imageUrl, setimageUrl] = useState('');
    
      const [open, setOpen] = useState(false);
    
  
    
      useEffect(() => {
        if (user) {
          setFirstName(Updated_user?.first_name);
          setLastName(Updated_user?.last_name);
          setDob(Updated_user?.dob);
          setHomeTown(Updated_user?.home_town);
          setEmail(Updated_user?.email);
          setMobileNumber(Updated_user?.mobile);
          setCompanyName(Updated_user?.company_name);
          setCompanyAddress(Updated_user?.company_address);
          setVatNumber(Updated_user?.vat_number);
          setimageUrl(Updated_user?.image);
        }
      }, [user]);
    
      const navigation = useNavigation()

  const isFocused = useIsFocused();
  
//   useEffect(() => {
//    getMenu()
    
//   }, [isFocused,user]);


//   console.log('==============menu======================');
//   console.log(menu);
//   console.log('====================================');
// const getMenu =()=>{
// const params ={
//     // id:data.id
//     id:'1'
// }
// dispatch(get_property_menu(params))
// }

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
        style={Styles.container}
      >
        {isLoading?<Loading />:null}
        <Animated.View
          style={[
            Styles.modal,
            {backgroundColor:'#fff',
              transform: [{ translateY: translateY }],
            },
          ]}
        >
            <View style={{flexDirection:'row',
            paddingHorizontal:20,
            justifyContent:'space-between',alignItems:'center'}}>
            <Text style={[Styles.title,{width:'15%'}]}></Text>
            <Text style={Styles.title}>Your Booking</Text>
          <TouchableOpacity
          onPress={()=>{
            onClose()
          }}
          style={{ alignItems:'flex-end',marginRight:20}}>
<Image  source={require('../../assets/Cropping/Close2x.png')}  style={{height:30,width:30}}/>
          </TouchableOpacity>

         
          </View>
             <ScrollView showsVerticalScrollIndicator={false}>
           
            <View
             
              style={Styles.profileImageContainer}>
           
                <Image source={{uri:data.image}} style={Styles.profileImage} />
          
    
             
            </View>
    
      
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={Styles.sectionHeader}>
                  <Text style={Styles.sectionHeaderText}>The Aston Vill Hotel</Text>
                  <Text style={[Styles.sectionHeaderText,{fontSize:12,marginTop:0,color:'#878787'}]}>Alice Springs NT 0870, Australia</Text>
                </View>
                <Text style={Styles.sectionHeaderText}>$200,7 /night</Text>
                </View>
                <View style={Styles.labelContainerWithMargin}>
                  <Text style={Styles.labelText}>Person</Text>
                </View>
                <View style={Styles.txtInput}>
                <Text style={Styles.labelText,{color:'#878787'}}>2</Text>
                </View>
               
                <View style={Styles.labelContainerWithMargin}>
                  <Text style={Styles.labelText}>Name</Text>
                </View>
                <View style={Styles.txtInput}>
                <Text style={Styles.labelText,{color:'#878787'}}>Demo</Text>
                </View>
               
                <View style={Styles.labelContainerWithMargin}>
                  <Text style={Styles.labelText}>Phone No.</Text>
                </View>
                <View style={Styles.txtInput}>
                <Text style={Styles.labelText,{color:'#878787'}}>789654123</Text>
                </View>
               
                <View style={Styles.labelContainerWithMargin}>
                  <Text style={Styles.labelText}>Email</Text>
                </View>
                <View style={Styles.txtInput}>
                <Text style={Styles.labelText,{color:'#878787'}}>demo@gmail.com</Text>
                </View>
               
                <View style={Styles.labelContainerWithMargin}>
                  <Text style={Styles.labelText}>Time</Text>
                </View>
                <View style={Styles.txtInput}>
                <Text style={Styles.labelText,{color:'#878787'}}>2 h</Text>
                </View>
               
                <View style={Styles.labelContainerWithMargin}>
                  <Text style={[Styles.labelText,{fontSize:16,fontWeight:'600'}]}>Other Guests</Text>
                </View>
                <View style={[Styles.labelContainerWithMargin,{marginTop:20}]}>
                  <Text style={Styles.labelText}>Name</Text>
                </View>
                <View style={Styles.txtInput}>
                <Text style={Styles.labelText,{color:'#878787'}}>other person name</Text>
                </View>
               
                <View style={Styles.labelContainerWithMargin}>
                  <Text style={Styles.labelText}>Age</Text>
                </View>
                <View style={Styles.txtInput}>
                <Text style={Styles.labelText,{color:'#878787'}}>21</Text>
                </View>
               <View   style={{height:hp(5)}}/>
          </ScrollView>

          
        </Animated.View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    paddingTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop:hp(10),
    minHeight: hp(90),
    paddingHorizontal:30,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Federo-Regular',
  },


    profileImageContainer: {
        marginTop:40,
      alignSelf: 'center',
      alignItems: 'center',
      paddingHorizontal: 5,
      height: 110,
      width: 110,
borderRadius:10, 
      backgroundColor: '#FFF',
      justifyContent: 'center',
      ...styles.shadow,
    },
    profileImage: {
      height: 90,
      width: 90,
      borderRadius: 45,
    },
    editIcon: {
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
    sectionHeader: {
      marginTop: hp(3),
    },
    sectionHeaderText: {
      fontFamily: 'Federo-Regular',
      fontSize:15,
      lineHeight: 30,
      fontWeight: '600',
      color: '#000',
    },
    row: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between',
    },
    labelContainer: {
      width: '47%',
      paddingLeft: 20,
    },
    labelText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#000',
      fontFamily: 'Federo-Regular',
    },
    labelContainerWithMargin: {
      width: '47%',
      paddingLeft: 20,
      marginTop: 10,
    },
    inputContainer: {
      width: '47%',
    },
    txtInput: {
      height:40,
      marginHorizontal: 10,
    
      justifyContent: 'center',
      paddingLeft: 10,

      backgroundColor: '#FFFFFF',
      marginTop: 5,
      paddingRight: 10,
    },
    datePickerContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    datePickerText: {
      fontSize: 16,
      color: '#000',
      fontFamily: 'Federo-Regular',
    },
    saveButton: {
      ...styles.tabBtn,
    },
    saveButtonText: {
      fontWeight: '600',
      fontSize: 17,
      color: '#FFF',
      lineHeight: 25.5,
      marginLeft: 10,
      fontFamily: 'Federo-Regular',
    },
  });
  

export default BookingDetailsModal;


