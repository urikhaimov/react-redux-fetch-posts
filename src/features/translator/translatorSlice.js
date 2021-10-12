import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');
const initialState = {
    data: "",
    status: 'idle',
    error: null
}

export const fetchTranslated = createAsyncThunk('translator/fetchTranslated', async (data, language) => {
    console.log('data infect', data.length)
    let subscriptionKey = "083f98b1ea1e49bcbadc13de4616d9a8";
    let endpoint = "https://api.cognitive.microsofttranslator.com";
    let location = "centralus";
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'en',
            'to': 'de'
        },
        data: data,
        responseType: 'json'
    }).then(function (response) {
        console.log(JSON.stringify(response.data, null, 4));
    })
});


const translatorSlice = createSlice({
    name: 'translatedPosts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.translatedPosts.push(action.payload)
            },
            prepare(title, content, userId) {
                // omit prepare logic
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.translatedPosts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.translatedPosts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTranslated.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTranslated.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchTranslated.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { postAdded, postUpdated, reactionAdded } = translatorSlice.actions

export default translatorSlice.reducer

export const selectAllTranslatedPosts = state => state.posts.translatedPosts

export const selectTranslatedPostById = (state, postId) =>
    state.posts.translatedPosts.find(post => post.id === postId);

export const setDataToTranslate = (posts) => {
    let data = {
        'titles':[],
        'bodies':[]
    }
    posts.forEach(element => {
        data['titles'].push({ 'text': element.title });
        data['bodies'].push({ 'text': element.body });
    });
    return data;
}


export const getTranslatedPosts = (posts, data) => {
    return posts.map((post, index) => ({
        ...post,
        title: data['titles'][index].text,
        body: data['bodies'][index + 1].text
    }));
}

