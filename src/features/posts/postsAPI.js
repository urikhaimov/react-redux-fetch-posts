import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response.data
})