import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTranslatedPosts } from './translatorAPI';


const initialState = {
    translatedPosts: [],
    status: 'idle',
    error: null
}

export const fetchTranslated = createAsyncThunk('translator/fetchTranslated', async (data) => {
    const response = await fetchTranslatedPosts(data.data, data.fromLanguage, data.toLanguage)
    return response.data
});


const translatorSlice = createSlice({
    name: 'translatedPosts',
    initialState,
    reducers: {
        clearPosts: (state) => {
            state.translatedPosts = initialState.translatedPosts;
        },
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
                state.translatedPosts = state.translatedPosts.concat(action.payload)
            })
            .addCase(fetchTranslated.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { postAdded, postUpdated, reactionAdded, clearPosts } = translatorSlice.actions

export default translatorSlice.reducer

export const selectAllTranslatedPosts = state => state.translatedPosts.translatedPosts

export const selectTranslatedPostById = (state, postId) =>
    state.translatedPosts.translatedPosts.find(post => post.id === postId);

export const setDataToTranslate = (posts) => {
    let data = {
        'titles': [],
        'bodies': []
    }
    posts.forEach(element => {
        data['titles'].push({ 'text': element.title });
        data['bodies'].push({ 'text': element.body });
    });
    return data;
}


export const getTranslatedPosts = (posts, data) => {
    const middleIndex = Math.floor(data.length / 2);
    const titles = data.slice(0, middleIndex);
    const bodies = data.slice(middleIndex);

    return posts.map((post, index) => ({
        ...post,
        title: titles[index].translations[0].text,
        body: bodies[index].translations[0].text,
      
    }));

}

