import React from 'react';
import { Rating } from './Rating';
import { Comment } from './Comment';

export const Film = ({ id, collection, onChangeRating, addComment, deleteComment, reloadPage}) => {
    const [writeComment, setWriteComment] = React.useState(false);
    const [value, setValue] = React.useState('');

    const addComment2 = (id) => {
        if (writeComment && value) {
            setValue('');
            addComment(id, value);
        };
        setWriteComment(!writeComment);
    };
    
    return (
        collection.map((obj, index) => {
            if (obj.id === id) {
                return (
                    <div key={obj.id} className='title'>
                        <div className='title-film-info'>
                            <button className='title-back-button' onClick={reloadPage}>&larr;</button>
                            <img className='title-img' src={obj.photo}></img>
                            <div className='title-info'>
                                <h1 className='title-name'>{obj.name}</h1>
                                <h4 className='title-year'><span>Year:</span> {obj.year}</h4>
                                <Rating
                                    key={index}
                                    collection={collection}
                                    onChangeRating={onChangeRating}
                                    id={id}
                                />
                                <p><span>Description:</span> {obj.description}</p>
                                <p><span>Director:</span> {obj.director}</p>
                                <p><span>Actors:</span> {obj.actors}</p>
                                <a href={obj.link}><span className='title-link'>Watch</span></a>
                                <ul className='title-comments'>
                                    Comments:
                                    {collection[id-1].comments &&
                                        collection[id-1].comments.map((obj, commentIndex) => {                                                                               
                                            return <Comment
                                                deleteComment={deleteComment}
                                                id={id}
                                                key={commentIndex}
                                                index={commentIndex}
                                                {...obj}
                                            />
                                        })
                                    }
                                </ul>
                                {writeComment &&
                                    <textarea value={value} onChange ={(e)=>setValue(e.target.value)} placeholder='text' className='title-textarea'></textarea>
                                }
                                <button onClick={()=>addComment2(id)} className='title-comment-button'>{writeComment ? 'publish a review' : 'write a review'}</button>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    ) 
}