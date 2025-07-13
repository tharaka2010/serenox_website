import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import { Contact } from './Pages/Contact/Contact';
import { Home } from './Pages/Home/Home';
import { About } from './Pages/About/About';
import { News } from './Pages/News/News';
import { Login } from './Pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './Pages/AdminManagement/AdminDashboard';
import ArticleList from './Pages/AdminManagement/SexEdContent/ArticleList';
import ArticleForm from './Pages/AdminManagement/SexEdContent/ArticleForm';
import NotificationCenter from './Pages/AdminManagement/NotificationManagement/NotificationCenter';
import NewsArticleList from './Pages/AdminManagement/NewsAndArticles/NewsArticleList';
import NewsArticleForm from './Pages/AdminManagement/NewsAndArticles/NewsArticleForm';
import ContentDetail from './Pages/ContentDetail';
import FeedbackList from './Pages/AdminManagement/UserFeedback/FeedbackList';
import FeedbackDetail from './Pages/AdminManagement/UserFeedback/FeedbackDetail';
import ReplyFormatSettings from './Pages/AdminManagement/UserFeedback/ReplyFormatSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about', element: <About /> },
      { path: 'news', element: <News /> },
      { path: 'login', element: <Login /> },
      { path: 'content/:type/:id', element: <ContentDetail /> },
      {
        element: <ProtectedRoute />, // Correct: This is the parent protected route
        children: [
          {
            path: 'admin/dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'admin/dashboard/sex-ed',
            element: <ArticleList />,
          },
          {
            path: 'admin/dashboard/sex-ed/new',
            element: <ArticleForm />,
          },
          {
            path: 'admin/dashboard/sex-ed/edit/:id',
            element: <ArticleForm />,
          },
          {
            path: 'admin/dashboard/notifications',
            element: <NotificationCenter />,
          },
          {
            path: 'admin/dashboard/news',
            element: <NewsArticleList />,
          },
          {
            path: 'admin/dashboard/news/new',
            element: <NewsArticleForm />,
          },
          {
            path: 'admin/dashboard/news/edit/:id',
            element: <NewsArticleForm />,
          },
          {
            path: 'admin/dashboard/feedback',
            element: <FeedbackList />,
          },
          {
            path: 'admin/dashboard/feedback/settings',
            element: <ReplyFormatSettings />,
          },
          {
            path: 'admin/dashboard/feedback/:id',
            element: <FeedbackDetail />,
          },
        ],
      },
    ],
  },
]);
