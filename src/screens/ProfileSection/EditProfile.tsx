import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {get_profile, update_profile} from '../../redux/feature/authSlice';
import TextInputField from '../../configs/TextInput';
import Edit from '../../assets/svg/Edit.svg';
import ProfileHeader from '../../configs/ProfileHeader';
import {styles} from '../../configs/Styles';

export default function EditProfile() {
  const user = useSelector(state => state.auth.userData);
  const Updated_user = useSelector(state => state.auth.Update_user);

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
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

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
    }
  }, [user]);

  useEffect(() => {
    get_userprofile();
  }, [user]);

  const get_userprofile = () => {
    const params = {
      user_id: user.id,
    };
    dispatch(get_profile(params));
  };

  const handleSave = () => {
    //   const updatedData = {
    //     id: user.id,
    //     firstName,
    //     lastName,
    //     dob,
    //     homeTown,
    //     email,
    //     mobileNumber,
    //   };
    //   dispatch(update_profile(updatedData));
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title="Edit Profile" width={21} />
        <View style={Styles.profileImageContainer}>
          <Image
            source={require('../../assets/Cropping/img3.png')}
            style={Styles.profileImage}
          />
          <View style={Styles.editIcon}>
            <Edit />
          </View>
        </View>
        
        {user?.type == 'User' && (
          <>
            <View style={Styles.sectionHeader}>
              <Text style={Styles.sectionHeaderText}>Public</Text>
            </View>
            <View style={Styles.row}>
              <View style={Styles.labelContainer}>
                <Text style={Styles.labelText}>First Name</Text>
              </View>
              <View style={Styles.labelContainer}>
                <Text style={Styles.labelText}>Last Name</Text>
              </View>
            </View>
            <View style={Styles.row}>
              <View style={Styles.inputContainer}>
                <View style={Styles.txtInput}>
                  <TextInputField
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>
              <View style={Styles.inputContainer}>
                <View style={Styles.txtInput}>
                  <TextInputField
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
            </View>
            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>DOB</Text>
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
              <Text style={{fontSize: 16, color: '#000', fontWeight: '600'}}>
                {dob}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}>
                <Image
                  source={require('../../assets/Cropping/date.png')}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>Home Town</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder="Home Town"
                value={homeTown}
                onChangeText={setHomeTown}
              />
            </View>
          </>
        )}
        {user?.type == 'Company' && (
          <>
            <View style={Styles.sectionHeader}>
              <Text style={Styles.sectionHeaderText}>Company Details</Text>
            </View>

            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>Company Name</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder="Company name"
                value={CompanyName}
                onChangeText={setCompanyName}
              />
            </View>
            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>VAT number</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder="VAT number"
                value={VatNumber}
                onChangeText={setVatNumber}
              />
            </View>
            <View style={Styles.labelContainerWithMargin}>
              <Text style={Styles.labelText}>Company Address</Text>
            </View>
            <View style={Styles.txtInput}>
              <TextInputField
                placeholder="company address"
                value={CompanyAddress}
                onChangeText={setCompanyAddress}
              />
            </View>
          </>
        )}
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionHeaderText}>Private</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>Email</Text>
        </View>
        <View style={Styles.txtInput}>
          <TextInputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>Mobile Number</Text>
        </View>
        <View style={Styles.txtInput}>
          <TextInputField
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>

        <TouchableOpacity onPress={handleSave} style={Styles.saveButton}>
          <Text style={Styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <View style={{height: 10}} />
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
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
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
    fontWeight: '800',
    color: '#000',
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
  },
});
