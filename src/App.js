import Header from "./component/Header";
import StartPage from "./pages/StartPage";
//import AdminPage from './pages/AdminPage';
import Blog from './pages/Blog'
import AboutMe from './pages/AboutMe'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Create from "./pages/Create";
import EditPost from './pages/EditPost'
import CreateE from "./pages/CreateE";
import { observer } from "mobx-react-lite";
import PostPage from "./pages/PostPage";

const App = observer(() => {
    const routes = [
    {
        path: '/',
        Component: StartPage
    },
    {
        path: '/posts',
        Component: Blog
    },
    {
        path: '/post' + '/:id',
        Component: PostPage
    },
    {
        path: '/about',
        Component: AboutMe
    }
]


  return (
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/posts/create" element={<Create/>} />

        {routes.map(({path, Component}) =>
            <Route path={path} element={<Component/>} key={path} exact/>
        )},
    
        <Route
                path="*"
                element={<Navigate to="/" replace />}
        />
        
    </Routes>

</BrowserRouter>
  );
}
)
export default App;
