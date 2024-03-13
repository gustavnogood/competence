import { Button } from '@mui/material';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import MovieList from '../components/MovieList/MovieList';

export function Roadmap() {
  
    return (
      <>
      <AuthenticatedTemplate>
        <div>
          <h1>Roadmap</h1>
          <p>A roadmap wil show here</p>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        </div>
        <MovieList />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>
          <h1>Roadmap</h1>
          <p>You need to login to see the secret message</p>
        </div>
        
      </UnauthenticatedTemplate>
      </>
    );
  };
  export default Roadmap;