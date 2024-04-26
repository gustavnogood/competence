import "./App.css";
import { PageLayout } from "./layouts/PageLayout";
import { Routes, Route, useNavigate } from "react-router-dom";
//msal imports
import { CustomNavigationClient } from "./utils/NavigationClient";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import React, { Suspense } from "react";
import Loading from "./components/loading/Loading";

type AppProps = {
  pca: IPublicClientApplication;
};

const LoginPage = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const DashBoard = React.lazy(() => import("./pages/DashBoard"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Roadmap = React.lazy(() => import("./pages/Roadmap"));

function App({ pca }: AppProps) {
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <PageLayout>
        <Pages />
      </PageLayout>
    </MsalProvider>
  );
}
// add lazy to each route
function Pages() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </Suspense>
  );
}

export default App;
