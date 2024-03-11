import Home from './pages/Home'
import Login from './pages/Login'
import DashBoard from './pages/DashBoard';
import Profile from './pages/Profile';
import Roadmap from './pages/Roadmap';
import './App.css';
import NavBarLayout from './components/navigation/NavBarLayout';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { UnauthenticatedTemplate } from '@azure/msal-react';

function App() {
  return (
    <>
      <AuthenticatedTemplate> 
        <NavBarLayout/>
        <Home />
        <DashBoard />
        <Profile />
        <Roadmap />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate> 
          <Login />
      </UnauthenticatedTemplate> 
        
      
    </>
  );
}

export default App
