import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import LoginPage from "./Login";
export function Dashboard() {
  
    return (
      <>
      <AuthenticatedTemplate>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard</p>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>
          <h1>Dashboard</h1>
          <p>You need to login to see the secret message</p>
          <LoginPage />
        </div>
      </UnauthenticatedTemplate>
      </>
    );
  };
  export default Dashboard;