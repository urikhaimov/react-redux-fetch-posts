
import React, { useEffect } from 'react';
import { Counter } from '../counter/Counter';
import { useSelector } from 'react-redux';
import { selectCount } from '../counter/counterSlice'

import styles from './Post.module.css';


const PostExcerpt = ({ post }) => {
    const count = useSelector(selectCount);
    console.log('count', count)
    useEffect(() => {


    }, [count])
    return (
        <article className={styles.post} key={post.id}>
            <h3>{post.title}</h3>
            <p >{post.body.substring(0, 100)}</p>
            <Counter />
        </article>
    )
}

export default PostExcerpt;
