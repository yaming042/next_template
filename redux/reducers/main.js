'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { isMobileApp, isPadApp, isPcApp } from '@/utils';
import { validate } from '@/service';

// 异步actions
// 更新store中用户的信息，可以用来更新用户store中的权限信息
export const updateUserInfo = createAsyncThunk('main/updateUserInfo', (status=true) => validate());

// main store
const initialState = {
    userInfo: {},
    grid: 'xs',
    isMobile: true,
    isPad: false,
    isPc: false,
    showLoginModal: false,
};

const main = createSlice({
    name: 'main',
    initialState,
    reducers: {
        resetApp: (state, action) => {
            for(let key in initialState) {
                state[key] = initialState[key];
            }
        },
        setStore: (state, action) => {
            for(let key in action.payload) {
                state[key] = action.payload[key];
            }
        },
        setUserInfo: (state, action) => { state.userInfo = action.payload },
        setGrid: (state, action) => { state.grid = action.payload },
        setDevice: (state, action) => {
            let obj = {};
            for(let key in action.payload) {
                obj[key] = action.payload[key];
            }
        },
        setLoginOpen: (state, action) => { state.showLoginModal = action.payload },
    },
    extraReducers: (builder) => {
        builder.addCase(updateUserInfo.pending, (state, action) => {}).
            addCase(updateUserInfo.fulfilled, (state, action) => {
                let response = action.payload || {};
                if(0 === response?.code) {
                    state.userInfo = response?.data || {};
                }
            }).
            addCase(updateUserInfo.rejected, (state, action) => {});
    },
});

// 同步actions
export const {resetApp, setStore, setUserInfo, setGrid, setDevice, setLoginOpen} = main.actions;

export default main.reducer;