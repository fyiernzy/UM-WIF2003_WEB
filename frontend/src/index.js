import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="301922741226-h4pkmnb91ih5h2m32o9c2tdfblurg5cs.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
