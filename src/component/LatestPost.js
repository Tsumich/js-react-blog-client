import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestPost = ({post}) => {
const navigate = useNavigate()

    return (
        <div className='latest-post'>
            <div className='latest-post-title'>
                <h3 onClick={() => navigate(`/post/${post.id}`)}>
                    {post.title}
                </h3>
            </div>
            <div className='latest-post-preview'>{post.preview}</div> 
        </div>
    );
}

export default LatestPost;
