import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import './EditCommentForm.css';

function EditCommentForm({ comment, setShowEdit }) {
    const dispatch = useDispatch();
    // const { commentId, postId } = useParams()
    // const comment = useSelector(state => state.posts[postId].comments[commentId])
    const [content, setContent] = useState(comment.content);
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        const errors = [];
        if (!content.length) errors.push('!length');
        if (content.length > 255) errors.push('length>255')

        setValidationErrors(errors);
    }, [content]);


    const onSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return setShowErrors(true);

        const newComment = {
            id: comment.id,
            content,
            postId: comment.postId
        }

        dispatch(postsActions.editComment(newComment))
            .then(_ => {
                setShowEdit(false);
            })
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
            <textarea
                type='text'
                id='edit-comment-input'
                name='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <div id='edit-comment-button-container'>
                <small style={content.length > 255 || content.length === 0 ? { color: 'red' } : {}}
                >{content.length}/255</small>
                <div>
                    <button type='button' id='cancel-edit-comment' onClick={() => setShowEdit(false)}>cancel</button>
                    <button type='submit' id='submit-edit-comment' style={{ color: 'var(--color-purple)' }}>submit</button>
                </div>
            </div>

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
