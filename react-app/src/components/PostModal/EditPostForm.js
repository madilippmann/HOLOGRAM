import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'

function EditPostForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session);
    const { postId } = useParams()
    // const [isLoaded, setIsLoaded] = useState(false);
    const [caption, setCaption] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false);


    useEffect(() => {
        const errors = [];
        if (caption.length > 255) errors.push('Caption must be 255 characters or less')
        setValidationErrors(errors);
    }, [caption])

    const onSubmit = (e) => {
        e.preventDefault();
        if (validationErrors.length) return setShowErrors(true);

        const post = {
            id: postId,
            caption
        }

        dispatch(postsActions.editPost(post))
            .then(async post => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                return history.push(`/posts/${post.id}`);
            })
            .catch(async (res) => {
                console.log(res);
                const data = await res.json();
                if (data && data.errors) {
                    setValidationErrors(data.errors);
                    setShowErrors(true);
                }
            });
    }

    return (
        <div>
            <form method='POST' action="/posts" onSubmit={onSubmit}>
                <label htmlFor='caption'>Caption</label>
                <input
                    type='text'
                    id='caption'
                    name='caption'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />

                <button type='submit'>submit</button>
            </form>

            {!showErrors ? null : (
                <ul>
                    {validationErrors.map(err => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EditPostForm;
