import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import TextInputField from '../../configs/TextInput';
import Edit from '../../assets/svg/Edit.svg';
import ProfileHeader from '../../configs/ProfileHeader';
import { styles } from '../../configs/Styles';
import Loading from '../../configs/Loader';
import { update_profile } from '../../redux/feature/featuresSlice';
import { get_profile } from '../../redux/feature/authSlice';
import { useNavigation } from '@react-navigation/native';
import localizationStrings from '../../utils/Localization';
import GooglePlacesInput from '../../configs/AutoAddress';

export default function EditProfile() {
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
  const [isLoadingImage, setisLoadingImage] = useState(true);

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


      const params = {
        data: {
          user_id: user?.id,
          mobile: mobileNumber,
          first_name: firstName,
          last_name: lastName,
          dob: dob,
          home_town: homeTown,
          image: profile.path ? {
            uri:
              Platform.OS === 'android'
                ? profile.path
                : profile?.path?.replace('file://', ''),
            type: profile.mime,
            name: `image${mobileNumber}${user?.id}.png`,
          } : {
            uri: imageUrl,

            type: 'image/jpeg',
            name: `image${mobileNumber}${user?.id}.png`,
          },
          email: email,
        },
        navigation: navigation,

      };
      dispatch(update_profile(params)).then(res => {
        get_userprofile
      })
    } else {
      const params = {
        data: {
          user_id: user?.id,
          company_name: CompanyName,
          vat_number: VatNumber,
          company_address: CompanyAddress,
          mobile: mobileNumber,
          email: email,
          image: profile.path ? {
            uri:
              Platform.OS === 'android'
                ? profile.path
                : profile?.path?.replace('file://', ''),
            type: profile.mime,
            name: `image${mobileNumber}${user?.id}.png`,
          } : {
            uri: imageUrl,

            type: 'image/jpeg',
            name: `image${mobileNumber}${user?.id}.png`,
          },
        },
        navigation: navigation,

      };
      dispatch(update_profile(params)).then(res => {
        get_userprofile
      })
    }
  };
  const pickupDOB = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero indexed
    const day = date.getDate();
    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month
      }-${year}`;

    console.log('Formatted date:', formattedDate);
    setDob(formattedDate);
  };

  useEffect(() => {
    get_userprofile();
  }, [user]);

  const get_userprofile = () => {
    const params = {
      user_id: user?.id,
    };
    dispatch(get_profile(params));
  };
  return (
    <View style={Styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={{height:Platform.OS !== 'android'?20:5,}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title={localizationStrings.Edit_profile} width={21} />
        <TouchableOpacity
          onPress={() => {
            openImageLibrary();
          }}
          style={Styles.profileImageContainer}>
          {imageUrl == '' ? (
            <Text style={{ fontFamily: 'Federo-Regular', fontSize: 18, color: '#000', fontWeight: '600' }}>
              {firstName[0]?.toUpperCase()}
              {lastName[0]?.toUpperCase()}
            </Text>
          ) : (
            <>
              {isLoadingImage && (
                <ActivityIndicator
                  style={Styles.loader}
                  size="small"
                  color="#0000ff"
                />
              )}
              <Image
                source={{ uri: imageUrl }}
                style={Styles.profileImage}
                onLoadStart={() => setisLoadingImage(true)}
                onLoadEnd={() => setisLoadingImage(false)}
              />
            </>
          )}

          <View style={Styles.editIcon}>
            <Edit />
          </View>
        </TouchableOpacity>

        {user?.type == 'User' && (
          <>
            <View style={Styles.sectionHeader}>
              <Text style={Styles.sectionHeaderText}>{localizationStrings.public}</Text>
            </View>
            <View style={Styles.row}>
              <View style={Styles.labelContainer}>
                <Text style={Styles.labelText}>{localizationStrings.First_name}</Text>
              </View>
              <View style={Styles.labelContainer}>
                <Text style={Styles.labelText}>{localizationStrings.Last_Name}</Text>
              </View>
            </View>
            <View style={Styles.row}>
              <View style={Styles.inputContainer}>
                <View style={Styles.txtInput}>
                  <TextInputField
                    placeholder={localizationStrings.First_name}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>
              <View style={Styles.inputContainer}>
                <View style={Styles.txtInput}>
                  <TextInputField
                    placeholder={localizationStrings.Last_Name}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
            </View>
            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>{localizationStrings.dob}</Text>
            </View>
            <View
              style={[
                Styles.txtInput,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '600',
                  marginLeft: 20,
                  fontFamily: 'Federo-Regular',
                }}>
                {dob}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}>
                <Image
                  source={require('../../assets/Cropping/date.png')}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>{localizationStrings.home_town}</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder={localizationStrings.home_town}
                value={homeTown}
                onChangeText={setHomeTown}
              />
              {/* <GooglePlacesInput  placeholder={localizationStrings.home_town}  /> */}
            </View>
          </>
        )}
        {user?.type == 'Company' && (
          <>
            <View style={Styles.sectionHeader}>
              <Text style={Styles.sectionHeaderText}>{localizationStrings.c_details}</Text>
            </View>

            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>{localizationStrings.c_name}</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder={localizationStrings.c_name}
                value={CompanyName}
                onChangeText={setCompanyName}
              />
            </View>
            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>{localizationStrings.VAT_number}</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder={localizationStrings.VAT_number}
                value={VatNumber}
                onChangeText={setVatNumber}
              />
            </View>
            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>{localizationStrings.c_address}</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder={localizationStrings.c_address}
                value={CompanyAddress}
                onChangeText={setCompanyAddress}
              />
            </View>
          </>
        )}
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionHeaderText}>{localizationStrings.private}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>{localizationStrings.email}</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontWeight: '600',
              marginLeft: 20,
              fontFamily: 'Federo-Regular',
            }}>
            {email}
          </Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>{localizationStrings.mobile_num}</Text>
        </View>
        <View style={Styles.txtInput}>
          <TextInputField
            placeholder={localizationStrings.mobile_num}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>

        <TouchableOpacity onPress={handleSave} style={Styles.saveButton}>
          <Text style={Styles.saveButtonText}>{localizationStrings.save}</Text>
        </TouchableOpacity>
        <View style={{ height: 10 }} />
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            pickupDOB(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          locale="en"
        />
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
    borderRadius: 55,
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
    fontSize: 20,
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
    height: 50,
    marginHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
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
