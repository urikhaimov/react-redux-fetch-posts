import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import translatorReducer from '../features/translator/translatorSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    translatedPosts: translatorReducer,
    counter: counterReducer,
  },
});
