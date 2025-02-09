import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { createPost } from '../httpRequest';
import { useNavigate } from 'react-router-dom';

const Create = observer(() => {
    const [paragraphs, setParagraph] = useState([{title:'', text:''}])
    const [tags, setTags] = useState()
    const [title, setTitle] = useState()
    const history = useNavigate();

    const addPost = () => {
        const fields = {
			title, tags, paragraphs
		}
        console.log(fields)
        if(paragraphs[0].text ==='' || paragraphs[0].title === '' || !title){
            alert("Заголовок и параграфы обязательны")
        }
        else{
            createPost(fields).then(data =>  history(`/post/${data.id}`))
        }
    }
    
    const addParagraphs = () => {
        setParagraph([...paragraphs, {title: '', text: '', number: Date.now()}])
    }

    const changeParagraph = (key, value, number) => {
        setParagraph(paragraphs.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    return (
        <div className='create-post-form'>

                <div className='left-column'>
                    <div>
                        <h2>Создать пост:</h2>
                        <textarea placeholder='Название (макс 255)'
                            name='title'
                            style={{width:'250px', 
                                height:'55px', 
                                resize: 'none',
                                fontSize:'22px', 
                                marginBottom:'20px'}}
                            onChange={e => setTitle(e.target.value)}/>
                        <input style={{width:'250px'}} placeholder='Введите теги вот так: #example #tags'
                            onChange={e => setTags(e.target.value)}/>
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
                   <button className='add-button' type='button' onClick={addParagraphs}>Добавить абзац</button>
                
                    <button className='create-post-button' type='submit' onClick={addPost}>Создать пост</button>
                </div>
                </div>       
        </div>
    )}  
)

export default Create;
