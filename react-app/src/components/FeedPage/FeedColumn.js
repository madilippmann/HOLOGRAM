import React from 'react';

import PostCard from '../PostCard';
import './FeedPage.css';

function FeedColumn({ column }) {


    return (
        <div className='posts-list'>
            {column.map(post => (
                <PostCard post={post} key={post.id} />
            ))}
        </div>
    );
}

export default FeedColumn
