import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
 } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from "./reducers";



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartItems', 'categories']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // These redux-persist actions include non-serializable values,
        // so we tell Redux Toolkit to ignore them.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['_persist'], // ignore persist reducer metadata
      },
    }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch