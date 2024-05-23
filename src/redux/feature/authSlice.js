import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';

import ScreenNameEnum from '../../routes/screenName.enum';

import {errorToast, successToast} from '../../configs/customToast';
import {API} from '../Api';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
  selectedRole: null,
  Update_user: null,
};

export const login = createAsyncThunk('login', async (params, thunkApi) => {
  console.log('===============login=====================', params.data);

  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await API.post('/login', params.data, config);

    if (response.data.status == '1') {
      thunkApi.dispatch(loginSuccess(response.data.data));

      params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      successToast(response.data.message);
    }
    else{
      errorToast(response.data.message);
    }

    return response.data.user_data;
  } catch (error) {
    console.log('Error:', error);
    errorToast(`Network error`);

    return thunkApi.rejectWithValue(error);
  }
});
export const register = createAsyncThunk(
  'register',
  async (params, thunkApi) => {
  
    try {
      const config = {
        headers: {
          Accept: 'application/json',
        },
      };
      const response = await API.post('/register', params.data, config);

      if (response.data.status == '1') {
        params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        successToast(response.data.message);
      }

      return response.data.user_data;
    } catch (error) {
      console.log('Error:', error);
      errorToast(`Network error`);

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const Get_UserProfile = createAsyncThunk(
  'Get_UserProfile',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/get_profile', params.data);

      if (response.data.status == '1') {
        console.log('Get_UserProfile Success', response.data.message);
      } else {
        console.log(
          'Get_UserProfile Not Found',
          'Please Enter Valid Group Code',
        );
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const ResetPasswordEmail = createAsyncThunk(
  'ResetPasswordEmail',
  async (params, thunkApi) => {
    console.log(
      '🚀 ~ file: AuthSlice.js:12 ~ password_reset ~ params:',
      params,
    );

    try {
      const response = await API.post('/password_reset', params.data);

      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ password_reset ~ response:',
        response.data.id,
      );

      if (response.data.status == '1') {
        successToast('Otp Send Successfully');
        params.navigation.navigate(ScreenNameEnum.OTP_SCREEN, {
          id: response.data.id,
        });
      } else {
        errorToast(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:',
        error,
      );
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const validOtp = createAsyncThunk(
  'validOtp',
  async (params, thunkApi) => {
    try {
      const response = await API.post('/check_otp', params.data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to FormData
        },
      });

      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ validOtp ~ response:',
        response.data,
      );

      if (response.data.status == '1') {
        successToast('Otp Verify Successfully');

        params.navigation.navigate(ScreenNameEnum.FORGOT_PASSWORD, {
          data: response.data.user_data,
        });
      } else {
        errorToast(response.data.message);
        // params.navigation.navigate(ScreenNameEnum.CREATE_NEWPASS,{email:params.data.email});
      }

      return response.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:',
        error,
      );

      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const change_password = createAsyncThunk(
  'change_password',
  async (params, thunkApi) => {
    console.log(
      '🚀 ~ file: AuthSlice.js:12 ~ change_password ~ params:',
      params.data,
    );

    try {
      const response = await API.post('/change_password', params.data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to FormData
        },
      });

      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ change_password ~ response:',
        response.data,
      );

      if (response.data.status == '1') {
        successToast('Password Reset Successfully');

        params.navigation.navigate(ScreenNameEnum.PROFILE_SCREEN);
      } else {
        errorToast('response.data.message');
      }

      return response.data;
    } catch (error) {
      errorToast('Network error');
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ CreatePassword ~ error:',
        error,
      );
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('log_out', async (params, thunkApi) => {
  try {
    const response = await API.post('/log_out', params.data);

    console.log(
      '🚀 ~ file: AuthSlice.js:29 ~ log_out ~ response:',
      response.data,
    );

    if (response.data.status == '1') {
      successToast(response.data.message);
      params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
    } else {
      errorToast(response.data.message);
    }

    
  } catch (error) {
    errorToast('Network error');
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});

//get Profile
export const get_profile = createAsyncThunk(
  'get_profile',
  async (params, thunkApi) => {
    try {

      console.log('=============get_profile=======================');
    
      const formData = new FormData();
      formData.append('user_id', params.user_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/get_profile', formData, config);

      if (response.data.status == '1') {
        // Alert.alert('Success', response.data.message);
      } else {
      }

      return response.data.user_data;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);


const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload;
    },
    updateSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: builder => {
    // login cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });

    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = true;
    });
    builder.addCase(ResetPasswordEmail.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(ResetPasswordEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(ResetPasswordEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(validOtp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(validOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(validOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(change_password.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(change_password.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(change_password.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(get_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.Update_user = action.payload;
    });
    builder.addCase(get_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {loginSuccess, updateSelectedRole, updateGroup_code} =
  AuthSlice.actions;

export default AuthSlice.reducer;
