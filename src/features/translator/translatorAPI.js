
import axios from 'axios';

const { v4: uuidv4 } = require('uuid');
const initialState = {
    translatedPosts: [],
    status: 'idle',
    error: null
}

export function fetchTranslatedPosts(data, from, to) {
    let subscriptionKey = "083f98b1ea1e49bcbadc13de4616d9a8";
    let endpoint = "https://api.cognitive.microsofttranslator.com";
    let location = "centralus";
    return axios({
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
            'from': from,
            'to': to
        },
        data: data,
        responseType: 'json'
    })

}
