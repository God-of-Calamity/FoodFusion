import { createSlice } from '@reduxjs/toolkit';

const initialState = { isClicked: false };

const orderMessageSlice = createSlice({
    name: 'orderMessage',
    initialState,
    reducers: {
        registerClick(state) {
            state.isClicked = true;
        },
        unregisterClick(state) {
            state.isClicked = false;
        }
    }
});

export const orderMessageAction = orderMessageSlice.actions;

export default orderMessageSlice;