
import './styles.css'

const PostExcerpt = ({ post }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.body.substring(0, 100)}</p>
        </article>
    )
}

export default PostExcerpt;
