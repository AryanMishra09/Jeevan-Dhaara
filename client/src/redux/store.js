
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;


// // export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";  // Import combineReducers
// import authSlice from "./features/auth/authSlice";

// // Combine reducers
// const rootReducer = combineReducers({
//   auth: authSlice.reducer,
//   // Add other reducers here if needed
// });

// // Configure the store with the combined reducer
// const store = configureStore({
//   reducer: rootReducer,
// });
