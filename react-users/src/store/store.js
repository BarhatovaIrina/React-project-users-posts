import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import userAuthReducer from "./reducers/userAuthReducer";

const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        userAuth: userAuthReducer
    },
});
export default store