import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import LoginPage from "./Login";

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
          <LoginPage />
        </div>
      </UnauthenticatedTemplate>
      </>
    );
  };
  export default Home;