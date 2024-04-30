import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/loading/Loading";

const LoginPage = React.lazy(() => import("../pages/Login"));
const Home = React.lazy(() => import("../pages/Home"));
const DashBoard = React.lazy(() => import("../pages/DashBoard"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Roadmap = React.lazy(() => import("../pages/Roadmap"));

export function LazyLoadingPages() {
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
