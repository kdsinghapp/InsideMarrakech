import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';

import {Alert} from 'react-native';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  DashboardList: null,
  ResturantDetails: null,
  Privacypolicy: null,
 
};

export const get_HomeDashBoard = createAsyncThunk(
  'get_HomeDashBoard',
  async (params, thunkApi) => {
    try {
      const response = await API.post('/home/get-home', null, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });

      if (response.data.success) {
        console.log('User Get_Home Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_HomeDashBoard .js:16 ~ get_HomeDashBoard ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_RestauRantDetails = createAsyncThunk(
  'get_RestauRantDetails',
  async (params, thunkApi) => {
    console.log('================RestauRantDetails=APi===================');
    try {
      const response = await API.post('/restaurant/get-restaurant-by-id', params.data, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });
      console.log('================RestauRantDetails=APi===================',response.data);
      if (response.data.success) {
        console.log('User get_RestauRantDetails Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_RestauRantDetails .js:16 ~ get_RestauRantDetails ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_terms_conditions = createAsyncThunk(
  'get_terms_conditions',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/get_terms_conditions');

      console.log(
        '🚀 ~ get_terms_conditions ~ response:',
        response.data.result,
      );

      if (response.data.status) {
        console.log('User get_terms_conditions Succesfuly');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ : get_terms_conditions error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/get_privacy_policy');

      console.log('🚀 ~ get_privacy_policy ~ response:', response.data.result);

      if (response.data.status) {
        console.log('User get_privacy_policy Succesfuly');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ : get_privacy_policy error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // DashboardSlice cases
    builder.addCase(get_HomeDashBoard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_HomeDashBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.DashboardList = action.payload;
    });
    builder.addCase(get_HomeDashBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_RestauRantDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_RestauRantDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ResturantDetails = action.payload;
    });
    builder.addCase(get_RestauRantDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default FeatureSlice.reducer;
