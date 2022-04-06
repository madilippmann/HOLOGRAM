import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'

import './EditPostForm.css';

function EditPostForm({ post, editCaption, toggleEditCaption }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session);
    const postId = post.id;
    // const [isLoaded, setIsLoaded] = useState(false);
    const [caption, setCaption] = useState(post.caption);
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false);
    let edit = editCaption;

    useEffect(() => {
        const errors = [];
        if (caption.length > 255) errors.push('Caption must be 255 characters or less')
        setValidationErrors(errors);
    }, [caption])

    const onSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return setShowErrors(true);

        toggleEditCaption();

        const post = {
            id: postId,
            caption
        }

        dispatch(postsActions.editPost(post))
            .then(async post => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            })
            .catch(async (res) => {
                console.log(res);
                const data = res
                if (data && data.errors) {
                    setValidationErrors(data.errors);
                    setShowErrors(true);
                }
            });
    }

    return edit ? (
        <div>
            <form method='POST' action="/posts" onSubmit={onSubmit}>
                {/* <label htmlFor='caption'>Caption</label> */}
                <textarea
                    id='caption-input'
                    name='caption'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <div id='edit-caption-submit-and-cancel-buttons'>
                    <button type='button' id='cancel-caption-button' onClick={() => toggleEditCaption()}>Cancel</button>
                    <button type='submit' id='save-caption-button'>Save</button>
                </div>
            </form>

            {!showErrors ? null : (
                <ul>
                    {validationErrors.map(err => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
        </div>
    )
    :
        <span className='post-caption'>{caption}</span>
}

export default EditPostForm;
