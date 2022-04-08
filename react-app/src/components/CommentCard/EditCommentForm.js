import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as postsActions from '../../store/posts'
import './EditCommentForm.css';

function EditCommentForm({ comment, setShowEdit }) {
    const dispatch = useDispatch();
    // const { commentId, postId } = useParams()
    // const comment = useSelector(state => state.posts[postId].comments[commentId])
    const [content, setContent] = useState(comment.content);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (!content.length) errors.push('!length');
        if (content.length > 255) errors.push('length>255')

        setValidationErrors(errors);
    }, [content]);


    const onSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return;

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
                style={content.length > 255 || content.length === 0 ? { borderColor: 'red' } : {}}
                onChange={(e) => setContent(e.target.value)}
            />

            <div id='edit-comment-button-container'>
                <small style={content.length > 255 || content.length === 0 ? { color: 'red' } : {}}
                >{content.length}/255</small>
                <div>
                    <button type='button' id='cancel-edit-comment' onClick={() => setShowEdit(false)}>cancel</button>
                    <button type='submit'
                        id='submit-edit-comment'
                        style={{ color: 'var(--color-purple)', cursor: validationErrors.length ? 'not-allowed' : 'pointer' }}
                    >submit</button>
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
