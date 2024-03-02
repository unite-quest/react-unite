import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './typography.css';
import './colors.css';
import './spacings.css';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: 'https://127e8e15c27dd96b69c9462eb0f4cf6b@o433447.ingest.sentry.io/4506841858244608',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  release: 'falealgumacoisa@' + process.env.npm_package_version,
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// Start the app when DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  const deferredPolyfills = [
    typeof window.MediaRecorder === 'undefined'
      ? require('audio-recorder-polyfill')
      : Promise.resolve(),
  ];

  const [AudioRecorder] = await Promise.all(deferredPolyfills);
  if (AudioRecorder) {
    window.MediaRecorder = AudioRecorder;
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
