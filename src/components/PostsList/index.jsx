import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, fetchPosts } from './../../features/posts/postsSlice';
import PostExcerpt from './../Post'
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchTranslated} from '../../features/translator/translatorSlice'
const PostsList = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }))
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts)
  console.log('posts', posts)
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    console.log('fetch')
    setTimeout(() => {
      dispatch(fetchPosts())
      setItems(items.concat(posts));
      
    
     
    }, 1500);
  };
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
    dispatch(fetchTranslated())
    setItems(posts)

  }, [postStatus, dispatch])

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
        {posts.map((post, index) => (
          <PostExcerpt key={index} post={post} />
        ))}

        {/* {items.map((i, index) => (
          <div key={index}>
            div - #{index}
          </div>
        ))} */}
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