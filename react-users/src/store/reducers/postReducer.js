import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    posts: [],
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPostsToStore: (state, actions) => {
            const { posts, loaded } = actions.payload;
            state.posts = posts;
            state.isLoading = loaded;
        },
    },
});

export const { addPostsToStore } = postsSlice.actions;
export default postsSlice.reducer;