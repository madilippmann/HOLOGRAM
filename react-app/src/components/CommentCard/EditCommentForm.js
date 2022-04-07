import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'

function EditCommentForm() {
    const dispatch = useDispatch();
    const { commentId, postId } = useParams()
    const comment = useSelector(state => state.posts[postId].comments[commentId])
    // const [isLoaded, setIsLoaded] = useState(false);
    const [content, setContent] = useState(comment?.content);
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false);



    useEffect(() => {
        const errors = [];
        if (!content.length) errors.push('please type something before commenting');
        if (content.length > 255) errors.push('comment must be less than 255 characters')

        setValidationErrors(errors);
    }, [content]);


    const onSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return setShowErrors(true);

        const comment = {
            id: commentId,
            content,
            postId
        }

        dispatch(postsActions.editComment(comment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setValidationErrors(data.errors);
                    setShowErrors(true);
                }
            });
    }

    return (
            <form onSubmit={onSubmit} className="edit-comment-form">
                <label htmlFor='content'>Caption</label>
                <input
                    type='text'
                    id='content'
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type='submit'>submit</button>
            </form>
    );
}

export default EditCommentForm;

// {!showErrors ? null : (
//     <ul>
//         {validationErrors.map(err => (
//             <li key={err}>{err}</li>
//         ))}
//     </ul>
// )}
