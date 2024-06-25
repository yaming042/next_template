import { configureStore } from '@reduxjs/toolkit';
import demo from './../reducers/demo';
import main from './../reducers/main';

const store = configureStore({
    reducer: {
        demo,
        main,
    },
});

export default store;