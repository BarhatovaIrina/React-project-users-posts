import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: {},
};

const userAuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserAuthToStore: (state, actions) => {
            const { user, loaded } = actions.payload;
            state.user = user;
            state.isLoading = loaded;
        },
        clearAuthState: (state) => {
            state.user = {};
            state.isLoading = false;
        }
    },
});

export const { saveUserAuthToStore, clearAuthState } = userAuthSlice.actions;
export default userAuthSlice.reducer;