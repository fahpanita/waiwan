import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import AuthProvider from "./Providers/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Dashboard from "./pages/Dashboard";
import AddProducts from "./pages/Dashboard/addProduct";
import AddCatagorys from "./pages/Dashboard/addCatagory";
import AddEvent from "./pages/Dashboard/addEvent";
import AddInfoEvent from "./pages/Dashboard/addInfoEvent";
import InfoUsers from "./pages/Dashboard/infoUsers";
import ListProduct from "./pages/Home/ListProduct";
import ListStock from "./pages/Dashboard/ListStock";
import { ProtectedRouteAdmin } from "./components/ProtectedRoute/ProtectedRouteAdmin";
import Experiment from "./pages/Home/Experiment";

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
            path="/listProduct"
            element={
              <Suspense fallback={<Loading />}>
                <ListProduct />
              </Suspense>
            }
          />
          <Route
            path="/experiment"
            element={
              <Suspense fallback={<Loading />}>
                <Experiment />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <Experiment />
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteAdmin>
                <Suspense fallback={<Loading />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="/addProduct"
            element={
              // <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <AddProducts />
              </Suspense>
              // {/* </ProtectedRoute> */}
            }
          />
          <Route
            path="/addCatagory"
            element={
              // <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <AddCatagorys />
              </Suspense>
              // {/* </ProtectedRoute> */}
            }
          />
          <Route
            path="/addInfoEvent"
            element={
              // <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <AddInfoEvent />
              </Suspense>
              // {/* </ProtectedRoute> */}
            }
          />
          <Route
            path="/addEvent"
            element={
              // <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <AddEvent />
              </Suspense>
              // {/* </ProtectedRoute> */}
            }
          />
          <Route
            path="/infoUsers"
            element={
              // <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <InfoUsers />
              </Suspense>
              // {/* </ProtectedRoute> */}
            }
          />
          <Route
            path="/listStock"
            element={
              // <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <ListStock />
              </Suspense>
              // {/* </ProtectedRoute> */}
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
