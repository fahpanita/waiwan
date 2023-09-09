import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Stock = lazy(() => import("./pages/Stock"));

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="/stock"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Stock />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
