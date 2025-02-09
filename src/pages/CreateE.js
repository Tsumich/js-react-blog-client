import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { createPost, updatePost} from '../httpRequest';
import { useNavigate , useParams } from 'react-router-dom';
import { fetchPostForEdit } from '../httpRequest';

const Create = observer(({isEdit}) => {
    const [post, setPost] = useState()
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [paragraphs, setParagraph] = useState([])
    const [tags, setTags] = useState('')
    const paragraphsArray = []

    const navigate  = useNavigate();
        console.log(isEdit, isLoading)
        if(isEdit && isLoading == false){
           const {id} = useParams() 
          fetchPostForEdit(id)
              .then(data =>{ 
                setPost(data)
                data.paragraph.map(i =>  paragraphsArray.push({title: i.title, text: i.text, number: Date.now()+i.id}))
                setParagraph(paragraphsArray)
                setTitle(data.title)
                setTags(data.tags)
                setIsLoading(true) 
            })
        }
    
    const addPost = () => {
        console.log('adding post')
        const fields = {
			title, tags, paragraphs
		}
        console.log(fields)
        if(paragraphs[0].text ==='' || paragraphs[0].title === '' || !title){
            alert("Заголовок и параграфы обязательны")
        }
        else{
            createPost(fields)//.then(data =>  navigate(`/post/` + data.id))
        }
    }
    
    const editPost = () => {
        const fields = {
			title, tags, paragraphs
		}
        console.log(fields)

        if(paragraphs[0].text ==='' || paragraphs[0].title === '' || !title){
            alert("Заголовок и параграфы обязательны")
        }
        updatePost(post.id, fields)
                //navigate('/post/' + post.id)   
                //window.location.reload()
    }

    const addParagraphs = () => {
        setParagraph([...paragraphs, {title: '', text: '', number: Date.now()}])
    }

    const changeParagraph = (key, value, number) => {
        setParagraph(paragraphs.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    return (
        <div className='create-post-form'>
            <form>
                <div className='left-column'>
                    <div>
                        {(isEdit ? <h2>Изменить пост:</h2> : <h2>Создать пост</h2>)}
                        <textarea placeholder='Название (макс 255)'
                            name='title'
                            defaultValue={post ? post.title : ''}
                            style={{width:'250px', 
                                height:'55px', 
                                resize: 'none',
                                fontSize:'22px', 
                                marginBottom:'20px'}}
                            onChange={e => setTitle(e.target.value)}></textarea>
                        <input style={{width:'250px', resize:'none'}} placeholder='Введите теги вот так: #example #tags'
                            onChange={e => setTags(e.target.value)} defaultValue={post ? post.tags : ''}></input>
                        <div className='image-create-post'></div>
                    </div>
                </div>
                <div className='right-column'>
                    <h3>Что хочешь написать?</h3>
                    <div className='created-paragraphs-area'>
                    {paragraphs.map( i => {
                    return(
                        <div className='paragraphs' contenteditable>
                        <textarea  value={i.title} 
                                placeholder='Заголовок параграфа'
                                style={{height:'45px', width:'300px',
                                    float:'left', 
                                    resize: 'none', fontSize:'18px'}}
                                onChange={(e) => changeParagraph('title', e.target.value, i.number)}/>
                        <textarea className value={i.text}
                                placeholder='Напиши здесь все что хочешь'
                                style={{height:'105px', width:'400px',
                                        float:'left', 
                                        marginLeft:'15px',resize: 'none', marginBottom:'5px'
                                }}
                                onChange={(e) => changeParagraph('text', e.target.value, i.number)}/>
                    </div>
                    )  
                    
                })}
                </div>
                
                <div >
                   <button className='add-button' type='button' onClick={addParagraphs}> Добавить абзац</button>
                
                    <button className='create-post-button' type='submit' onClick={isEdit? editPost : addPost}>{isEdit? 'Подтвердить изменения' : 'Создать пост'}</button>
                </div>
                </div>  
                </form>     
        </div>
    )}  
)

export default Create;
