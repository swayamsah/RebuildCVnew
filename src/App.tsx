import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPage } from "./components/PrivacyPage";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/Auth/LoginPage";
import SignupPage from "./components/Auth/SignupPage";
import ResumeBuilder from "./components/Dashboard/ResumeBuilder";
import SubscriptionPage from "./components/Dashboard/SubscriptionPage";
import SettingsPage from "./components/Dashboard/SettingsPage";
import HelpPage from "./components/Dashboard/HelpPage";
import ComparisonView from "./components/Dashboard/ComparisonView";
import { FC } from 'react';

const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/terms",
      element: <TermsPage />,
    },
    {
      path: "/privacy",
      element: <PrivacyPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/resume/:id",
      element: (
        <ProtectedRoute>
          <ResumeBuilder />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/compare/:id",
      element: (
        <ProtectedRoute>
          <ComparisonView />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/subscription",
      element: (
        <ProtectedRoute>
          <SubscriptionPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/settings",
      element: (
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/help",
      element: (
        <ProtectedRoute>
          <HelpPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
