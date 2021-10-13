
import React from 'react';
import { Counter } from '../counter/Counter';
import { useSelector } from 'react-redux';
import { selectPostById, reactionAdded, reactionReduced } from '../posts/postsSlice'
import styles from './Post.module.css';


const Post = ({ id }) => {
    const post = useSelector((state) => selectPostById(state, id));
    return (
        <article className={styles.post} key={post.id}>
            <h3>{post.title}</h3>
            <p >{post.body.substring(0, 100)}</p>
            <Counter
                id={post.id}
                count={post.reactions['rate']}
                increment={reactionAdded}
                decrement={reactionReduced}
            />
        </article>
    )
}

export default Post;
