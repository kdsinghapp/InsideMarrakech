import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { change_password } from '../../redux/feature/authSlice';
import TextInputField from '../../configs/TextInput';
import ProfileHeader from '../../configs/ProfileHeader';
import Loading from '../../configs/Loader';
import { useNavigation } from '@react-navigation/native';
import localizationStrings from '../../utils/Localization';

interface User {
  id: string;
}

interface RootState {
  auth: {
    userData: User;
  };
}

const ChangePassword: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userData);
  const isLoding = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigation =useNavigation()

  const handleChangePassword = async() => {
    if (newPassword !== confirmPassword) {
      errorMessage('New passwords or confirm password not match');
      return;
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      errorMessage('Please fill in all fields');
      return;
    }
    const params = {
      data:{
      user_id: user?.id,
      old_password: oldPassword,
      password: newPassword,
      }
      ,
      navigation:navigation
    };
   await dispatch(change_password(params));
  };

  return (
    <View style={styles.container}>

    {isLoding ?<Loading />:null}
      <ProfileHeader title={localizationStrings.Change_pass} width={13} />

      <View style={[styles.txtInput, { marginTop: 40 }]}>
        <TextInputField
          placeholder={localizationStrings.current_pass}
          firstLogo={true}
          img={require('../../assets/Cropping/Lock3x.png') as ImageSourcePropType}
          showEye={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
      </View>
      <View style={[styles.txtInput, { marginTop: 20 }]}>
        <TextInputField
          placeholder={localizationStrings.confirm_pass}
          firstLogo={true}
          img={require('../../assets/Cropping/Lock3x.png') as ImageSourcePropType}
          showEye={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <View style={[styles.txtInput, { marginTop: 20 }]}>
        <TextInputField
          placeholder="Confirm New Password"
          firstLogo={true}
          img={require('../../assets/Cropping/Lock3x.png') as ImageSourcePropType}
          showEye={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

    

      <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
        <Text style={styles.saveButtonText}>{localizationStrings.save}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  txtInput: {
    backgroundColor: '#FFFFFF',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
    paddingRight: 10,
  },

  saveButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90%'),
    alignSelf: 'center',
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

export default ChangePassword;
