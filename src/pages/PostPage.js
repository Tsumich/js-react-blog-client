import React, { useEffect, useState } from 'react';
import { dropPost, fetchPost } from '../httpRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';

const PostPage = () => {

    const [post, setPost] = useState({paragraph: []})
    const [tags, setTags] = useState([])
    const [showModal, setShowModal] = useState(false)
    const {id} = useParams()

    const navigate = useNavigate();
  
    useEffect(() => {
        fetchPost(id)
          .then(data =>{ 
          if(!data.id) {
            return(
              navigate('/')
            )
          }
          setPost(data)
          setTags(data.tags)})
    }, [])
 

    const deletePost = () => {
        dropPost(id).then(navigate('/')).then(alert("Пост удален"))
    }

    const editPost = () => {
        navigate('/post/edit/' + post.id)
    }

    const createModal = () => {
      setShowModal(true)
    }


      return (
        <div id='post-page'> 
          <div className='post-left-column'>
            <h1 className='post-page-title'>
            {post.title}
          </h1>
          <p style={{fontSize:'14px'}}>{post.createdAt}</p>
          <div style={{width:'200px'}} className='post-page-tags'>
            <p> Тэги: </p>
            {tags.map((tag) => (
              <div className='tag'>{tag}</div>
            ))}
          </div>

          <div className='post-page-buttons-area'>
            <button className='post-page-buttons-edit' onClick={editPost}>
              Редактировать пост
            </button>
            <button className='post-page-buttons-delete' onClick={createModal}>
              Удалить пост
            </button>
                {showModal?(
                  <div style={{width:'200px', marginLeft:'40px', marginTop:'30px',textAlign:'center', height:'40px'}}> 
                  Удалить пост?
                  <div style={{marginTop:'10px'}}>
                    <button onClick={() => deletePost}  style={{width:'100px', float:'left'}}>Yes Yes Yes</button>
                  <button onClick={() => setShowModal(false)}  style={{float:'left', marginLeft:'20px'}}>nain</button>
                    </div>
                  </div>
                  )
                    :<div></div>}
          </div>

          </div>
          

          <div className='post-right-column'>
            {post.paragraph.map((par) => (
              <div>
                <h3>{par.title}</h3>
              <div>{par.text}</div>
              </div>
            ))}
          </div>
        </div>
    );
    }
  
    


export default PostPage;
