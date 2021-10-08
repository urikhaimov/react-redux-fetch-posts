import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');
const initialState = {
  data: "",    
  status: 'idle',
  error: null
}

export const fetchTranslated= createAsyncThunk('translator/fetchTranslated', async () => {
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
            'to': ['de', 'it']
        },
        data: [{
            'text': 'Hello World!'
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
    })
  });
