export const Comment = ({ name, text, deleteComment, index, id }) => {

    return (
        <li key={index} className='title-user-comment'>
                <h2>{name}</h2>
                <p>{text}</p>
            <button onClick={() => deleteComment(id, index)} className='title-user-comment-button'>х</button>
        </li>
    )
}