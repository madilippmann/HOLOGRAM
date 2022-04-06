import React, { useEffect, useState } from 'react';

import PostCard from '../PostCard';
import './FeedPage.css';

function FeedColumn({ column }) {


    return (
        <div className='posts-list'>
            {column.map(post => (
                <PostCard post={post} />
            ))}
        </div>
    );
}

export default FeedColumn
