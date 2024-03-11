import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

export function Home() {
  
    return (
      <>
      <AuthenticatedTemplate>
        <div>
          <h1>Home</h1>
          <p>Welcome to our website!</p>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>
          <h1>Home</h1>
          <p>You need to login to see the secret message</p>
        </div>
      </UnauthenticatedTemplate>
      </>
    );
  };
  export default Home;