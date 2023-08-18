import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import UserForm from './component/UserForm/UserForm';
import SecondPage from './component/SecondPage/SecondPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserForm></UserForm>,
  },
  {
    path:'/second_page',
    element:<SecondPage></SecondPage>
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
