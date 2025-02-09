import React, { createContext } from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import App from './App';
import PostStore from './store/PostStore'
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{posts: new PostStore()}}>
    <>
    <App />
    </>
  </Context.Provider>
  
);

//'время 1:42'