import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import LoginPage from './Login';
import RoadmapList from '../components/roadmapList/RoadmapTree';

export function Roadmap() {
  
    return (
      <>
      <AuthenticatedTemplate>
        
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className='Roadmap'>
          <h1>Roadmap</h1>
          <p>You need to login to see the secret message :P</p>
          <LoginPage />
        </div>
        <RoadmapList />
        
      </UnauthenticatedTemplate>
      </>
    );
  };
  export default Roadmap;