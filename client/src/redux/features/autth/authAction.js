import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../services/api';
import { toast } from 'react-toastify';


export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password });
            if (data.success) {
                localStorage.setItem('token', data.token)
                toast.success(data.message);
                window.location.replace('/')
            }
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userRegister = createAsyncThunk(
    'auth.register',
    async ({
        name,
        role,
        email,
        password,
        organisationName,
        hospitalName,
        website,
        address,
        phone
    }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('auth/register', {
                name,
                role,
                email,
                password,
                organisationName,
                hospitalName,
                website,
                address,
                phone
            })
            if (data.success) {
                toast.success(data.message)
                window.location.replace('/login')
            }
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

// Current User 

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({ rejectWithValue }) => {
        try {
            const res = await API.get('/auth/current-user')
            if (res.data) {
                return res?.data
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)