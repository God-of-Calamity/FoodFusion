import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadStatus: false,
    error: false,
    statusMessage: 'status',
    items: []
}

const orderStatusSlice = createSlice({
    name: 'orderStatus',
    initialState,
    reducers: {
        setErrorStatus(state, action) {
            state.error = action.payload;
        },
        setStatus(state, action) {
            state.items = action.payload.data
            state.loadStatus = true
            state.error = action.payload.error
        },
        unsetStatus(state) {
            state.loadStatus = false
            state.items = []
        },
        setStatusLoadingMessage(state) {
            if (state.statusMessage.toLowerCase() === 'loading') {
                state.statusMessage = 'status';
            }
            else if (state.statusMessage.toLowerCase() === 'status') {
                state.statusMessage = 'loading';
            }
        }
    }
});

export const orderStatusActions = orderStatusSlice.actions;

export const getCurrentStatus = (requestData) => {
    return async (dispatch) => {
        dispatch(orderStatusActions.setStatusLoadingMessage());

        const response = await fetch(`http://localhost:4000/foods/userFoodStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const responseData = await response.json();
        if (!response.ok) {
            dispatch(orderStatusActions.setErrorStatus(responseData.error));
        }

        dispatch(orderStatusActions.setStatusLoadingMessage());
        dispatch(orderStatusActions.setStatus({
            data: responseData.userOrders,
            error: responseData.error
        }));
    }
}

export default orderStatusSlice;