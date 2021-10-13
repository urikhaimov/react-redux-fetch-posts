import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import translatorReducer from '../features/translator/translatorSlice';
import selectLanguageSlice from '../features/selectLanguage/selectLanguageSlice'
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    translatedPosts: translatorReducer,
    language: selectLanguageSlice
  },
});
