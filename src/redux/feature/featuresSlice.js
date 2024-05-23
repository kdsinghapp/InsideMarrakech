import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';

import {Alert} from 'react-native';
import {errorToast, successToast} from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  PrivacyPolicy:null,
  TermsCondition:null,
  CategoryList:null
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

      return response.data.user_data;
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
      data.append('vat_number',params.data.vat_number);
      data.append('company_address', params.data.company_address);

      

      const response = await API.post('/update_profile', data, config);
      console.log(
        '==============update_profile======================',
        response.data,
      );
      if (response.data.status == '1') {
        successToast('Profile Update Successfuly');
        if(params.type === 'User'){

          params.navigation.navigate(ScreenNameEnum.PROFILE_SCREEN);
        }else{
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
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {

      console.log('=============get_privacy_policy=======================')
    

      const response = await API.get('/get_privacy_policy',);

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

      console.log('=============get_terms_conditions=======================')
    

      const response = await API.get('/get_terms_conditions',);

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

      console.log('=============get_category=======================')
    

      const response = await API.get('/get_category',);

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
    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.PrivacyPolicy=action.payload
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
      state.TermsCondition=action.payload
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
      state.CategoryList=action.payload
    });
    builder.addCase(get_category.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default FeatureSlice.reducer;
