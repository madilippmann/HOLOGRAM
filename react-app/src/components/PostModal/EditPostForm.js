import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'

import './EditPostForm.css';

function EditPostForm({ post, setEditCaption }) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState(post.caption);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (caption.length > 255) errors.push('Caption must be 255 characters or less')
        setValidationErrors(errors);
    }, [caption])

    const onSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return;

        const newPost = {
            id: post.id,
            caption
        }

        dispatch(postsActions.editPost(newPost))
            .then(_ => {
                setEditCaption(false);
            })
            .catch(async (res) => {
                console.log(res);
                const data = res
                if (data && data.errors) {
                    setValidationErrors(data.errors);
                }
            });
    }

    return (
        <div>
            <form method='POST' action="/posts" onSubmit={onSubmit}>
                <textarea
                    id='caption-input'
                    name='caption'
                    value={caption}
                    style={caption.length > 255 ? { borderColor: 'red' } : {}}
                    onChange={(e) => setCaption(e.target.value)}
                />

                <div id='edit-caption-lower'>
                    <small style={caption.length > 255 ? { color: 'red' } : {}}
                    >{caption.length}/255</small>
                    <div id='edit-post-button-container'>
                        <button type='button'
                            id='cancel-caption-button'
                            onClick={() => setEditCaption(false)}
                        >Cancel</button>

                        <button type='submit'
                            id='save-caption-button'
                            style={{ cursor: validationErrors.length ? 'not-allowed' : 'pointer' }}
                        >Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPostForm;
