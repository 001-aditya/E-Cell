


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import JoinUs from "./pages/JoinUs";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import EventsPage from "./pages/EventsPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AuthConfirm from "./components/Auth/AuthConfirm";
import Dashboard from "./components/Auth/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Admin from "./pages/Admin";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/team", element: <Team /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogDetail /> },
      // { path: "/join", element: <JoinUs /> },
      { path: "/gallery", element: <Gallery /> }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/auth/confirm", element: <AuthConfirm /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <Admin />
      </ProtectedRoute>
    )
  }
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}


