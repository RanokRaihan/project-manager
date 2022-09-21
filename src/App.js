import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Projects from "./components/pages/Projects";
import Teams from "./components/pages/Teams";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Layout from "./components/ui/Layout";
import useAuthCheck from "./hooks/useAuthCheck";

const App = () => {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <h1>Checking authentication</h1>
  ) : (
    <Router>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/teams'
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />
          <Route
            path='/projects'
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
