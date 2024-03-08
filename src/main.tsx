import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './auth/authConfig.ts'

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
