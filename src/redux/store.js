import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import subCategoryReducer from './slices/subCategorySlice';
import orderReducer from './slices/orderSlice';
import loyaltyPointsReducer from './slices/loyaltyPointsSlice';
import newsReducer from './slices/newsSlice';
import bookRequestReducer from './slices/bookRequestSlice';
import printRequestReducer from './slices/printRequestSlice';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['currentUser', 'token', 'cartItems', 'shippingDetails'], // Specify which parts of the state to persist
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    product: productReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    order: orderReducer,
    loyaltyPoints: loyaltyPointsReducer,
    news: newsReducer,
    bookRequest: bookRequestReducer,
    printRequest: printRequestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); 