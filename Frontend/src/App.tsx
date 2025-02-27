import { Navigate, useRoutes } from "react-router-dom";
import "./App.css";
import Authlayout from "./layout/Authlayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatScreenPage from "./pages/ChatScreenPage";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./layout/DashboardLayout";
import NotFound from "./components/NotFound";
import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return useRoutes([
    {
      path: "/auth",
      element: <Authlayout />,
      children: [
        { element: <Navigate to={"login"} replace />, index: true },
        {
          path: "login",
          element: (
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          ),
        },
        {
          path: "register",
          element: (
            <OpenRoute>
              <SignUpPage />
            </OpenRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={"/app"} replace />, index: true },
        {
          path: "app",
          element: (
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          ),
        },
        {
          path: "app/receiverId/:id/name/:name",
          element: (
            <PrivateRoute>
              <ChatScreenPage />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default App;