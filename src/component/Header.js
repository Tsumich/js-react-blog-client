import React from 'react';
import Navigate from 'react-dom';
import { useNavigate } from 'react-router-dom';
const Header = () => {

    const history = useNavigate()

    const navigateTo = () => {
        history('/posts/create')
        //window.location.reload()
    }

    return (
        <div className='header'>
            <div className='logo-image' onClick={() => history('/')}></div>
                <span className='logo' onClick={() => history('/')}> Блог Дяны </span>
                <button className='header-create'>Все посты</button>
            <button className="header-create" onClick={() => navigateTo()}>Сказать</button> 
            <button className="header-create"> Обо мне</button>
        </div>
        
    );
}

export default Header;
