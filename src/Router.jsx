import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import { Contact } from './Pages/Contact/Contact';
import { Home } from './Pages/Home/Home';
import { About } from './Pages/About/About';
import { News } from './Pages/News/News';
import { WhatWebSit } from './Pages/Home/WhatWebSit';
import { Login } from './Pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ArticleList from './Pages/Dashboard/ArticleList';
import ArticleForm from './Pages/Dashboard/ArticleForm';


export const router =createBrowserRouter ([
    {
      path: "/",
      element: <App/>,
      children: [
        {index: true, element:<Home/>},
        {path: "home", element:<Home/>},
        {path: "contact", element:<Contact/>},
        {path: "about", element:<About/>},
        {path: "news", element:<News/>},
        {path: "whatwebsite", element:< WhatWebSit />},
        {path: "login", element:<Login/>},
        {
          path: "dashboard",
          element: <ProtectedRoute />,
          children: [
            { path: "articles", element: <ArticleList /> },
            { path: "articles/new", element: <ArticleForm /> },
            { path: "articles/edit/:id", element: <ArticleForm /> },
          ],
        },
      ],
    },
  ])
  