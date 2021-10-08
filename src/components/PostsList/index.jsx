import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, fetchPosts } from './../../features/posts/postsSlice';
import PostExcerpt from './../Post'


const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts)
  console.log('posts', posts)
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = posts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList