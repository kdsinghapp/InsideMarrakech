
    import React, {useEffect, useState} from 'react';
    import {
      View,
      Text,
      Image,
      ScrollView,
      TouchableOpacity,
      StyleSheet,
      Platform,
    } from 'react-native';
    import DatePicker from 'react-native-date-picker';
    import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
    import {useDispatch, useSelector} from 'react-redux';
    import ImagePicker from 'react-native-image-crop-picker';
    import TextInputField from '../../configs/TextInput';
    import Edit from '../../assets/svg/Edit.svg';
    import ProfileHeader from '../../configs/ProfileHeader';
    import {styles} from '../../configs/Styles';
    import Loading from '../../configs/Loader';
    import {update_profile} from '../../redux/feature/featuresSlice';
    import {get_profile} from '../../redux/feature/authSlice';
    import {useNavigation} from '@react-navigation/native';
    
    export default function CbookingDetails() {
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
    
      const dispatch = useDispatch();
      const openImageLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(image => {
            setprofile(image);
            setimageUrl(image.path);
          })
          .catch(err => {
            console.log(err);
          });
      };
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
    
      const navigation = useNavigation();
    
      const handleSave = () => {
        if (user?.type == 'User') {
          console.log('=========user called===========================', {
            uri:
              Platform.OS === 'android'
                ? profile.path
                : profile?.path?.replace('file://', ''),
            type: profile.mime,
            name: `image${mobileNumber}${user?.id}.png`,
          });
    
          const params = {
            data: {
              user_id: user?.id,
              mobile: mobileNumber,
              first_name: firstName,
              last_name: lastName,
              dob: dob,
              home_town: homeTown,
              image: {
                uri:
                  Platform.OS === 'android'
                    ? profile.path
                    : profile?.path?.replace('file://', ''),
                type: profile.mime,
                name: `image${mobileNumber}${user?.id}.png`,
              },
              email: email,
            },
            navigation: navigation,
            type:user?.type
          };
          dispatch(update_profile(params));
        } else {
          const params = {
            data: {
              user_id: user?.id,
              company_name: CompanyName,
              vat_number: VatNumber,
              company_address: CompanyAddress,
              mobile: mobileNumber,
              email: email,
              image: {
                uri:
                  Platform.OS === 'android'
                    ? profile.path
                    : profile?.path?.replace('file://', ''),
                type: profile.mime,
                name: `image${mobileNumber}${user?.id}.png`,
              },
            },
            navigation: navigation,
            type:user?.type
          };
          dispatch(update_profile(params));
        }
      };
      const pickupDOB = date => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero indexed
        const day = date.getDate();
        const formattedDate = `${day < 10 ? '0' + day : day}-${
          month < 10 ? '0' + month : month
        }-${year}`;
    
        console.log('Formatted date:', formattedDate);
        setDob(formattedDate);
      };
      return (
        <View style={Styles.container}>
          {isLoading ? <Loading /> : null}
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileHeader titile="Booking Details" width={21} />
            <View
             
              style={Styles.profileImageContainer}>
              {imageUrl == '' ? (
                <Text style={{fontFamily: 'Federo-Regular',fontSize: 18, color: '#000', fontWeight: '600'}}>
                  {firstName[0]?.toUpperCase()}
                  {lastName[0]?.toUpperCase()}
                </Text>
              ) : (
                <Image source={{uri: imageUrl}} style={Styles.profileImage} />
              )}
    
             
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
               
          </ScrollView>
        </View>
      );
    }
    
    const Styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
      },
      profileImageContainer: {
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
    