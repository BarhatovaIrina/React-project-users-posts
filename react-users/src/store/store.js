import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import userAuthReducer from "./reducers/userAuthReducer";
// import postAuthReducer from "./reducers/postAuthReducer";
import postAuthReducer from "./reducers/postAuthReducer";

const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        user: userAuthReducer,
        posts_user: postAuthReducer
    },
});
export default store