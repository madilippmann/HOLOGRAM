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
  const [fileUrl, setFileUrl] = useState()


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

  // HELPER TO UPLOAD TO S3 onChange OF FILE INPUTS
  const s3Upload = async (file, inputName) => {
    if (!file) return console.log('upload a file first');

    const res = await fetch('/api/s3');
    const url = await res.json();
    console.log('from backend: ', url)
    const fileUrl = await postToS3(url, file);
    setFileUrl(() => fileUrl)
  }

  const postToS3 = async (url, body) => {
    console.log('URL: ', url)
    console.log('BODY: ', body)
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: body,
      });

      if (res.ok) {
        const imageUrl = res.url.split('?')[0];
        return imageUrl;
      } else {
        console.error('response from s3 fetch not ok, but did not error out');
      }

    } catch (e) {
      console.log('PUT REQUEST TO S3 FAILED!');
      console.log(e);
    }
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
        <label htmlFor='file'>Image Upload</label>
        <input type="file" id="img" name="img" accept="image/*"
          onChange={e => s3Upload(e.target.files[0], e.target.name)}
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
