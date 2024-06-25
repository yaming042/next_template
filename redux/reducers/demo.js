import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// 异步actions，可是简单使用如：dispatch(testAjax())
export const testAjax = createAsyncThunk('demo/testAjax', (status=true) => {
    return new Promise((resolve, reject) => {
        let t = setTimeout(() => {
            clearTimeout(t);

            if(status) {
                resolve({code: 0, data: 'ajax success', message: 'ok'});
            }else{
                reject({code: -1, data: 'ajax failed', message: 'failed'});
            }
        }, 3000);
    })
});

// demo store
const initialState = {
    test: '',
};

const demo = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        update: (state, action) => {state.test = action.payload},
    },
    extraReducers: (builder) => {
        builder.addCase(testAjax.pending, (state, action) => {state.test = 'pending'}).
            addCase(testAjax.fulfilled, (state, action) => {state.test = 'fulfilled'}).
            addCase(testAjax.rejected, (state, action) => {state.test = 'rejected'});
    },
});

// 同步actions，用法：在需要的地方导入action，dispatch即可
export const actions = demo.actions;

// 导出reducer，初始化store时使用
export default demo.reducer;