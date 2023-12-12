import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    posts_user: [],
    posts_all: [],
    count_posts: 0
};

export const postsUserSlice = createSlice({
    name: 'posts_user',
    initialState,
    reducers: {
        getPostsData: (state, actions) => {
            const { posts_all, loaded } = actions.payload;
            state.posts_all = posts_all;
            state.isLoading = loaded;
        },
        getPostsByUserData: (state, actions) => {
            const { posts_user, loaded, count_posts } = actions.payload;
            state.posts_user = posts_user;
            state.isLoading = loaded;
            state.count_posts = count_posts;
        },

    },
});

export const { getPostsData, getPostsByUserData } = postsUserSlice.actions;
export default postsUserSlice.reducer;