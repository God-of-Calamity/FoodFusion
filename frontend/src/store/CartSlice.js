import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            if (!state._id) {
                state._id = action.payload._id;
                state.userName = action.payload.userName;
                state.totalQuantity = 0;
                state.totalPrice = 0;
                state.totalOrders = [
                    {
                        restaurentName: action.payload.restaurentName,
                        orders: [
                            {
                                foodName: action.payload.foodName,
                                time: action.payload.time.toString(),
                                price: action.payload.price.toString(),
                                quantity: 1
                            }
                        ]
                    }
                ]
                state.totalPrice = parseInt(state.totalPrice) + parseInt(action.payload.price);
                state.totalQuantity++;
            }
            else {
                state._id = action.payload._id;
                state.userName = action.payload.userName;
                const restaurent = (state.totalOrders).find(restaurent => restaurent.restaurentName === action.payload.restaurentName);
                if (!restaurent) {
                    (state.totalOrders).push({
                        restaurentName: action.payload.restaurentName,
                        orders: [
                            {
                                foodName: action.payload.foodName,
                                time: action.payload.time.toString(),
                                price: action.payload.price.toString(),
                                quantity: 1
                            }
                        ]
                    });
                    state.totalPrice = parseInt(state.totalPrice) + parseInt(action.payload.price);
                    state.totalQuantity++;
                } else {
                    const hasOrdered = (restaurent.orders).find(order => order.foodName === action.payload.foodName);

                    if (!hasOrdered) {
                        (restaurent.orders).push({
                            foodName: action.payload.foodName,
                            time: action.payload.time.toString(),
                            price: action.payload.price.toString(),
                            quantity: 1
                        });
                        state.totalPrice = parseInt(state.totalPrice) + parseInt(action.payload.price);
                        state.totalQuantity++;
                    } else {
                        state.totalPrice = parseInt(state.totalPrice) + parseInt(hasOrdered.price);
                        state.totalQuantity++;
                        hasOrdered.quantity++;
                    }
                }
            }
        },
        removeItemFromCart(state, action) {
            if (state.totalOrders && state.totalOrders.length > 0) {
                const restaurent = (state.totalOrders).find(restaurent => restaurent.restaurentName === action.payload.restaurentName);
                if (restaurent) {
                    const order = (restaurent.orders).find(order => order.foodName === action.payload.foodName);
                    if (order) {
                        state.totalPrice = parseInt(state.totalPrice) - parseInt(action.payload.price);
                        order.quantity--;
                        state.totalQuantity--;

                        if (order.quantity === 0) {
                            restaurent.orders = (restaurent.orders).filter(order => order.foodName !== action.payload.foodName);
                        }
                        if (restaurent.orders.length === 0) {
                            state.totalOrders = (state.totalOrders).filter(restaurent => restaurent.restaurentName !== action.payload.restaurentName);
                        }
                    }

                }
            }

        },
        replaceCart(state, action) {
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.totalOrders = [];
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;