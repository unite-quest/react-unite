import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ErrorPage from './ErrorPage.tsx';
import './index.css';
import Challenges from './screens/challenges/core/Challenges.tsx';
import ChallengesDetails from './screens/challenges/core/ChallengesDetails.tsx';
import ChallengeLanding from './screens/challenges/core/ChallengesLanding.tsx';
import Credits from './screens/credits/Credits.tsx';
import Home from './screens/home/Home.tsx';
import Registry from './screens/registry/Registry.tsx';
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
        path: 'registry',
        element: <Registry />,
      },
      {
        path: 'story',
        element: <Story />,
      },
      {
        path: 'challenge/:challengeId/landing',
        element: <ChallengeLanding />,
      },
      {
        path: 'challenge/:challengeId',
        element: <Challenges />,
      },
      {
        path: 'challenge/:challengeId/details',
        element: <ChallengesDetails />,
      },
      {
        path: 'credits',
        element: <Credits />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
