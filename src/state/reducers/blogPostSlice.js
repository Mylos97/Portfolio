import { createSlice } from "@reduxjs/toolkit";

export const blogPostsSlice = createSlice({
    name:'blogPosts',
    initialState:{
        blogPosts:[]
    },
    reducers: {
        setBlogPosts:(state, action) => {
            state.blogPosts = action.payload 
        }
    }
})

export const {setBlogPosts} = blogPostsSlice.actions
export default blogPostsSlice.reducer