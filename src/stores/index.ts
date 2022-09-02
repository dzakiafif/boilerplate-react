import { configureStore } from '@reduxjs/toolkit';
import listMedicineReducer from 'stores/slices/list-medicine-slice';

const store = configureStore({
  reducer: {
    list: listMedicineReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
