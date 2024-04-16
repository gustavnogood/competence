import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig.ts";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <Router>
      <ThemeProvider theme={theme}>
        <App pca={msalInstance} />
      </ThemeProvider>
    </Router>
  );
});

// const pca = new PublicClientApplication(msalConfig);

// const AppWithAuthentication = () => (
//   <React.StrictMode>
//   <MsalProvider instance={pca}>
//         <App />
//   </MsalProvider>
// </React.StrictMode>
// );

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <AppWithAuthentication />
// )
