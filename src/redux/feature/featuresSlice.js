import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';

import {Alert} from 'react-native';
import {errorToast, successToast} from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  PrivacyPolicy: null,
  TermsCondition: null,
  CategoryList: null,
  BookingList:null
};
export const update_notiification = createAsyncThunk(
  'update_notiification',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
        },
      };
      const response = await API.post('/update_notiification', params, config);
      console.log(
        '==============update_notiification======================',
        response.data,
      );
      if (response.data.status == '1') {
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_user_booking_list = createAsyncThunk(
  'get_user_booking_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };   console.log(
        '==============get_user_booking_list======================',params)
      const response = await API.post('/get_user_booking_list', params, config);
   
        console.log('=============response=======================',response.data);
  
      
      if (response.data.status == '1') {
      }

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const update_profile = createAsyncThunk(
  'update_profile',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      let data = new FormData();
      data.append('user_id', params.data.user_id);
      data.append('mobile', params.data.mobile);
      data.append('first_name', params.data.first_name);
      data.append('last_name', params.data.last_name);
      data.append('dob', params.data.dob);
      data.append('home_town', params.data.home_town);
      data.append('image', params.data.image);
      data.append('email', params.data.email);
      data.append('company_name', params.data.company_name);
      data.append('vat_number', params.data.vat_number);
      data.append('company_address', params.data.company_address);

      const response = await API.post('/update_profile', data, config);
      console.log(
        '==============update_profile======================',
        response.data,
      );
      if (response.data.status == '1') {
        successToast('Profile Update Successfuly');
        if (params.type === 'User') {
          params.navigation.navigate(ScreenNameEnum.PROFILE_SCREEN);
        } else {
          params.navigation.navigate(ScreenNameEnum.CProfile);
        }
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('NetWork error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_property = createAsyncThunk(
  'add_property',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };



console.log('=============add_property=======================');
console.log(params);
console.log('====================================');
     const response = await API.post('/add_property', params, config);
      console.log(
        '==============add_property======================',
        response.data,
      );
      if (response.data.status == '1') {
        successToast(response.data.message);
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('Network error');
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_booking = createAsyncThunk(
  'add_booking',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
      console.log('=============add_booking=======================');
      console.log(params);

      let data = new FormData();
      data.append('cat_id', params.cat_id);
      data.append('company_id', params.company_id);
      data.append('name', params.name);
      data.append('amount', params.amount);
      data.append('address', params.address);
      data.append('lat', params.lat);
      data.append('lon', params.lon);
      data.append('description', params.description);
      data.append('book_online_mobile_number', params.book_online_mobile_number);
      data.append('title', params.title);
      data.append('opening_hours', params.opening_hours);
      data.append('lunch_start', params.lunch_start);
      data.append('lunch_end', params.lunch_end);
      data.append('dinner_start', params.dinner_start);
      data.append('dinner_end', params.dinner_end);

      // Append images individually
      params.images.forEach((image, index) => {
        data.append(`images[${index}]`, {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
      });
console.log('====================================');
console.log(data);
console.log('====================================');

     const response = await API.post('/add_booking', data, config);
      console.log(
        '==============add_booking======================',
        response.data,
      );
      if (response.data.status == '1') {
        successToast(response.data.message);
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      console.log('=============get_privacy_policy=======================');

      const response = await API.get('/get_privacy_policy');

      if (response.data.status == '1') {
      } else {
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_terms_conditions = createAsyncThunk(
  'get_terms_conditions',
  async (params, thunkApi) => {
    try {
      console.log('=============get_terms_conditions=======================');

      const response = await API.get('/get_terms_conditions');

      if (response.data.status == '1') {
      } else {
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_category = createAsyncThunk(
  'get_category',
  async (params, thunkApi) => {
    try {
      console.log('=============get_category=======================');

      const response = await API.get('/get_category');

      if (response.data.status == '1') {
      } else {
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(update_notiification.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_notiification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_notiification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_user_booking_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_user_booking_list.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.BookingList = action.payload
    });
    builder.addCase(get_user_booking_list.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_property.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_property.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_property.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_booking.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_booking.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_booking.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.PrivacyPolicy = action.payload;
    });
    builder.addCase(get_privacy_policy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_terms_conditions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_terms_conditions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TermsCondition = action.payload;
    });
    builder.addCase(get_terms_conditions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_category.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_category.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.CategoryList = action.payload;
    });
    builder.addCase(get_category.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default FeatureSlice.reducer;
