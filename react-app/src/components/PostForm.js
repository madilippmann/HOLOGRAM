import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import isURL from 'validator/lib/isURL';

import * as postsActions from '../store/posts'

function PostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [caption, setCaption] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    const errors = [];
    if (!postImageUrl.length) errors.push('please enter an image url');
    if (!isURL(postImageUrl)) errors.push('please enter a valid url');
    if (caption.length > 255) errors.push('Caption must be less than 255 characters')

    setValidationErrors(errors);
  }, [caption, postImageUrl])

  const onSubmit = (e) => {
    e.preventDefault();
    if (validationErrors.length) return setShowErrors(true);

    const post = {
      caption, postImageUrl
    }

    dispatch(postsActions.createPost(post))
      .then(async post => {
        console.log(post);
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

        <label htmlFor='postImageUrl'>Image Url</label>
        <input
          type='text'
          id='postImageUrl'
          name='postImageUrl'
          value={postImageUrl}
          onChange={(e) => setPostImageUrl(e.target.value)}
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

export default PostForm;
