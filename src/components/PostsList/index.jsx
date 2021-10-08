import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, fetchPosts } from './../../features/posts/postsSlice';
import PostExcerpt from './../Post'
import InfiniteScroll from 'react-infinite-scroll-component';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts)
  console.log('posts', posts)
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
     
        posts =  posts.concat(Array.from({ length: 20 }))
     
    }, 1500);
  };
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content =
      <div
        id="scrollableDiv"
        style={{
          height: '90vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
          inverse={true} //
          hasMore={true}
          loader={<h4>Loading...</h4>}
         
        >
          {posts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>

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