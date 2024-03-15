import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import LoginPage from './Login';
import RoadmapList from '../components/roadmapList/RoadmapList';

export function Roadmap() {
  
    return (
      <>
      <AuthenticatedTemplate>
        <RoadmapList />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>
          <h1>Roadmap</h1>
          <p>You need to login to see the secret message</p>
          <LoginPage />
        </div>
        
      </UnauthenticatedTemplate>
      </>
    );
  };
  export default Roadmap;