import {configureStore} from '@reduxjs/toolkit'
import counterReducer  from './reducers/counterSlice'
import blogPostsReducer from './reducers/blogPostSlice'

export default configureStore({
    reducer:{counterReducer, blogPostsReducer},
})