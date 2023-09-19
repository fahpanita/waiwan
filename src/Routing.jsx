import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import AuthProvider from "./Providers/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import Stock from "./pages/Stock";

// const Home = lazy(() => import("./pages/Home"));
// const Stock = lazy(() => import("./pages/Stock"));

const Routing = () => {
  return (
    <AuthProvider>
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
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <Stock />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
