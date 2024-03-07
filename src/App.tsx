import Home from './pages/Home'
import Login from './pages/Login'
import { AuthenticatedTemplate } from '@azure/msal-react';
import { UnauthenticatedTemplate } from '@azure/msal-react';

function App() {
  return (
    <>
      
        <AuthenticatedTemplate>
        <Home />
        </AuthenticatedTemplate>
        
        <UnauthenticatedTemplate>
          
          <Login />
        </UnauthenticatedTemplate>
        
      
    </>
  );
}

export default App
