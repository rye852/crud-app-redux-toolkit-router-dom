import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayOut from './pages/MainLayOut';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Detail from './pages/Detail';
import PostsList from './pages/PostsList';
import Errore from './pages/Errore';
import store from './states';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

const paramsCheking = (id) => {
  if (!parseInt(id)) {
    throw new Response('', {
      statusText: 'the post id is wrong !',
      status: 400,
    });
  }
  return id;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayOut />,
    errorElement: <Errore />,
    children: [
      {
        index: true,
        element: <PostsList />,
      },
      {
        path: 'post/add',
        element: <AddPost />,
      },
      {
        path: 'post/:id/edit',
        element: <EditPost />,
        loader({ params }) {
          paramsCheking(params.id);
        },
      },
      {
        path: 'post/:id',
        element: <Detail />,
        loader({ params }) {
          paramsCheking(params.id);
        },
      },
    ],
  },
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
