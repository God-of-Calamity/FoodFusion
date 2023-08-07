import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './CartSlice';
import orderMessageSlice from './orderMessage';
import orderStatusSlice from './orderStatus';

const store = configureStore({
    reducer: { cart: cartSlice.reducer, orderMessage: orderMessageSlice.reducer, status: orderStatusSlice.reducer }
});

export default store;