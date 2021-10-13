import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, fetchPosts } from './postsSlice';
import Post from './../post/Post'
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  selectAllTranslatedPosts,
  setDataToTranslate,
  fetchTranslated,
  getTranslatedPosts,
  clearTranslatedPosts
} from './../translator/translatorSlice';

import { selectCurrentLanguage } from './../selectLanguage/selectLanguageSlice';

/**
 * Represents list of posts.
 * @constructor
 */
const Posts = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }))
  const [data, setData] = useState(null);
  const [prevLang, setPrevLang] = useState('en')
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const translatedPosts = useSelector(selectAllTranslatedPosts)
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error);
  const lang = useSelector(selectCurrentLanguage);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 5 more records in 1.5 secs
    setTimeout(() => {
      const length = items.length;
      setItems(items.concat(posts.slice(length, length + 5)));
    }, 1500);
  };
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
    if (postStatus === 'succeeded') {
      setData(setDataToTranslate(posts));
    }
  }, [postStatus, dispatch, posts, setData])

  useEffect(() => {
    const middleIndex = data ? Math.floor(data['titles'].length / 2) : 0;

    if (postStatus === 'succeeded' && data && prevLang !==lang && lang !== 'en') {
      dispatch(clearTranslatedPosts())
      dispatch(fetchTranslated({
        data: data['titles'],
        fromLanguage: 'en',
        toLanguage: lang
      }));

      dispatch(fetchTranslated({
        data: data['bodies'].slice(0, middleIndex),
        fromLanguage: 'en',
        toLanguage: lang
      }));

      dispatch(fetchTranslated({
        data: data['bodies'].slice(middleIndex),
        fromLanguage: 'en',
        toLanguage: lang
      }));
      setPrevLang(lang)
    }
  }, [postStatus, dispatch, lang, data, prevLang])

  useEffect(() => {
    let translatedItems = [];
    if (posts.length * 2 === translatedPosts.length && translatedPosts.length > 0) {
      translatedItems = getTranslatedPosts(posts, translatedPosts);
    } else if (lang === 'en') {
      translatedItems = posts
    }
    setItems(translatedItems.slice(0, 6));

  }, [setItems, translatedPosts, posts, lang])

  let content

  if (postStatus === 'loading') {
    content = <div text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content =


      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}>

        {items.map((post, index) => (
          <Post key={index} post={post} />
        ))}

      </InfiniteScroll>

  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (<section className="posts-list">
    <h2>Posts</h2>
    {content}
  </section>
  )
}

export default Posts