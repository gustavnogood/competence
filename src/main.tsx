import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MsalProvider } from '@azure/msal-react'
import { Configuration, PublicClientApplication } from '@azure/msal-browser'

const msalConfig: Configuration = {
  auth: {
    clientId: '00094825-09c0-4ceb-b5b8-ace584a47e94',
  }
};

const pca = new PublicClientApplication(msalConfig);

const AppWithAuthentication = () => (
  <React.StrictMode>
  <MsalProvider instance={pca}>
        <App />
  </MsalProvider>
</React.StrictMode>
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppWithAuthentication />
)
