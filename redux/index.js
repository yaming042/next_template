"use client";

import { useEffect, useRef } from "react";
import store from "./store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";

export default ({ children }) => {
    const storeRef = useRef(null);

    if (!storeRef.current) {
        storeRef.current = store;
    }

    useEffect(() => {
        if (null !== storeRef.current) {
            const unsubscribe = setupListeners(storeRef.current.dispatch);
            return unsubscribe;
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
};