// ModalForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import localizationStrings from '../../utils/Localization';
import { errorToast } from '../../configs/customToast';

const ModalForm = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    errorToast('This feature coming soon')
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
            placeholder="First Name"
            value={formData.name}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.name}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            value={formData.email}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.service}
            placeholderTextColor={'#777777'}
            onChangeText={(text) => handleChange('service', text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#777777'}
            placeholder="Kind of Service"
            value={formData.service}
            onChangeText={(text) => handleChange('service', text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#777777'}
            
            placeholder="Message"
            value={formData.service}
            onChangeText={(text) => handleChange('service', text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
              <Text style={styles.buttonText}>Submit</Text>
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
    color:'#000',
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
