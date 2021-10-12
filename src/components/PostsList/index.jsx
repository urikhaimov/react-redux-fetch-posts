import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, fetchPosts } from './../../features/posts/postsSlice';
import PostExcerpt from './../Post'
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectAllTranslatedPosts, setDataToTranslate, fetchTranslated } from '../../features/translator/translatorSlice'
const PostsList = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }))
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const translatedPosts = useSelector(selectAllTranslatedPosts)
  console.log('translatedPosts', translatedPosts)
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error);

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
      const data = setDataToTranslate(posts);
      dispatch(fetchTranslated({
        data: data['titles'],
        fromLanguage: 'en',
        toLanguage: 'de'
      }));

      dispatch(fetchTranslated({
        data: data['bodies'].slice(0, 50),
        fromLanguage: 'en',
        toLanguage: 'de'
      }));

      dispatch(fetchTranslated({
        data: data['bodies'].slice(50),
        fromLanguage: 'en',
        toLanguage: 'de'
      }));
    }


  }, [postStatus, dispatch])


  useEffect(() => {
    setItems(posts.slice(0, 6))

  }, [setItems, posts])

  let content

  if (postStatus === 'loading') {
    content = <div text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content =


      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {items.map((post, index) => (
          <PostExcerpt key={index} post={post} />
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

export default PostsList