import Home from './pages/Home'
// import Login from './pages/Login'
import DashBoard from './pages/DashBoard';
import Profile from './pages/Profile';
import Roadmap from './pages/Roadmap';
import './App.css';
// import NavBarLayout from './components/navigation/NavBarLayout';
import Grid from "@mui/material/Grid";
import {PageLayout} from './layouts/PageLayout';
import { Routes, Route, useNavigate } from "react-router-dom";
//msal imports 
import { CustomNavigationClient } from "./utils/NavigationClient";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
// import { AuthenticatedTemplate } from '@azure/msal-react';
// import { UnauthenticatedTemplate } from '@azure/msal-react';

type AppProps = {
  pca: IPublicClientApplication;
};


function App({ pca }: AppProps) {
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  return ( 
    <MsalProvider instance={pca}>
      <PageLayout>
        <Grid container justifyContent="center">
          <Pages />
        </Grid>
      </PageLayout>
    </MsalProvider>
  )

};

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  );
}

export default App


  {/* return (
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
  ); */}