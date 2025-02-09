import React , {useContext, useEffect} from 'react';
import { Context } from '../index';
import { fetchLastPosts } from '../httpRequest';
import {observer} from "mobx-react-lite";
import LatestPost from '../component/LatestPost';

const StartPage = observer(() => {
    const {posts} = useContext(Context)
     
    useEffect(() => {
        fetchLastPosts().then(data => {  
            posts.setLatestPosts(data)
        })
    }, [])

    return (
        <div className='start-page'>
            
            <div className='latest-post-area'>
                        <div className='latest-post-area-title' style={{fontSize:'22px'}}> Последние посты:</div>
                    {posts.latestPosts.map(post =>
                            <LatestPost key={post.id} post={post}/>
                        )}
            </div>
            
             <div className='start-page-image'>
                <div>
                    я хотела тут понатыкать фотографии которые сделала моя подруга в абхазии, но потом устала
                </div>
            </div>           

        </div>
        
    );
}
)
export default StartPage;
