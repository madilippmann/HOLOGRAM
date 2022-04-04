import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import * as postsActions from '../store/posts'

function CommentForm() {
  const dispatch = useDispatch();
  // TODO PASS IN postId AS PROP TO COMMENT COMPONENT TO USE AS ARG FOR createComment THUNK
  const { postId } = useParams();
  // const user = useSelector(state => state.session);
  // const post = useSelector(state => state.posts[postId]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState('');
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    (async () => {
      await dispatch(postsActions.fetchPost(postId))
    })();
    setIsLoaded(() => true);
  }, [dispatch])

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
      content, postId
    }

    dispatch(postsActions.createComment(comment))
      .then(async comment => {
        return;
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
          setShowErrors(true);
        }
      });
  }

  return !isLoaded ? null : (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor='content'>Comment</label>
        <input
          type='text'
          id='content'
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
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

export default CommentForm;
