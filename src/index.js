import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider} from 'react-router-dom';
import { router } from './Router';
import { AuthProvider } from './components/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);


