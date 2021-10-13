import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Counter.module.css';

export function Counter(props) {
  const id = props.id;
  const count = props.count;
  const increment = props.increment;
  const decrement = props.decrement;
  const dispatch = useDispatch();


  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement({
            postId: id,
            reaction: 'rate'
          }))}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment({
            postId: id,
            reaction: 'rate'
          }))}
        >
          +
        </button>
      </div>

    </div>
  );
}
