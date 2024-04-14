import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ErrorPage from './ErrorPage.tsx';
import './index.css';
import Challenges from './screens/challenges/Challenges.tsx';
import ChallengesDetails from './screens/challenges/ChallengesDetails.tsx';
import ChallengesIntros from './screens/challenges/ChallengesIntros.tsx';
import Home from './screens/home/Home.tsx';
import Story from './screens/story/Story.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'story',
        element: <Story />,
      },
      {
        path: 'challenge/:challengeId',
        element: <ChallengesIntros />,
      },
      {
        path: 'challenge/:challengeId/challenge',
        element: <Challenges />,
      },
      {
        path: 'challenge/:challengeId/challenge/details',
        element: <ChallengesDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
