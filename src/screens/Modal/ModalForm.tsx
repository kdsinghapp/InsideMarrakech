import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import localizationStrings from '../../utils/Localization';
import { useDispatch, useSelector } from 'react-redux';
import { add_customise_service } from '../../redux/feature/featuresSlice';

const ModalForm = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone_number: '',
    kind_of_service: '',
    message: '',
  });
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const params = {
      user_id: user?.id,
      ...formData
    };

    dispatch(add_customise_service(params));
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{localizationStrings.Customized_service}</Text>

          <TextInput
            style={styles.input}
            placeholder={localizationStrings.First_name}
            value={formData.first_name}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('first_name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder={localizationStrings.Last_Name}
            value={formData.last_name}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('last_name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder={localizationStrings.c_name}
            value={formData.company_name}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('company_name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder={localizationStrings.Mobile_number}
            value={formData.phone_number}
            keyboardType='number-pad'
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('phone_number', text)}
          />
          <TextInput
            style={styles.input}
            placeholder={localizationStrings.Kind_of_Service}
            value={formData.kind_of_service}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('kind_of_service', text)}
          />
          <TextInput
            style={styles.input}
            placeholder={localizationStrings.messages}
            value={formData.message}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('message', text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>{localizationStrings.Cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
              <Text style={styles.buttonText}>{localizationStrings.Submit}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp(80),
    padding: wp(5),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: hp(2),
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  input: {
    width: '100%',
    fontFamily: 'Federo-Regular',
    padding: wp(3),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: hp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: wp(3),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginRight: wp(2),
  },
  submitButton: {
    backgroundColor: '#C59745',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Federo-Regular',
  },
});

export default ModalForm;
