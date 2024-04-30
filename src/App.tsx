import "./App.css";
import { PageLayout } from "./layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { CustomNavigationClient } from "./utils/NavigationClient";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { LazyLoadingPages } from "./utils/LazyLoadingPages";

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
        <LazyLoadingPages />
      </PageLayout>
    </MsalProvider>
  );
}

export default App;
