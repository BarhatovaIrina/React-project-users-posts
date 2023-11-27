import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    users: [],
    // user: {},
    userName: ''
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, actions) => {
            const { users, loaded } = actions.payload;
            state.users = users;
            state.isLoading = loaded;
        },
        getUserName: (state, actions) => {
            const index = actions.payload;
            console.log(index)
            state.userName = state.users[index]
            console.log(state.userName)
        }

    },
});

export const { getUsers, getUserName } = usersSlice.actions;
export default usersSlice.reducer;