import Home from './pages/Home'
import Login from './pages/Login'
import NavBarLayout from './components/navigation/NavBarLayout';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { UnauthenticatedTemplate } from '@azure/msal-react';

function App() {
  return (
    <>
          {/* <AuthenticatedTemplate>  */}
        <NavBarLayout/>
        <Home />
          {/* </AuthenticatedTemplate>
        <UnauthenticatedTemplate> 
          <Login />
        </UnauthenticatedTemplate>  */}
        
      
    </>
  );
}

export default App
