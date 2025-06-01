import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Combine reducer trước
const rootReducer = combineReducers({
  auth: authReducer,
});

// Dùng persistReducer với rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // đây là persisted root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
