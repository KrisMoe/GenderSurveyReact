import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/errorpage'
import Results from './pages/results'
import Random from './pages/random'
import Survey from './pages/survey';
import SplashPage from './pages/splashpage';
const router = createBrowserRouter([
  {
      path: "/",
      element: <App/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <SplashPage/>
        },
        {
          path: "/results/:id",
          element: <Results/>,
        },
        {
          path: "/random",
          element: <Random/>,
        },
        {
          path: "/survey",
          element: <Survey/>,
        },
          ]
  }])
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
