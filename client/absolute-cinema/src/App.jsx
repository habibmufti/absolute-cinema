import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, redirect } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home';
import Ticket from './components/tickets';

const router = createBrowserRouter([
  {
    element: <>
    <Navbar /> 
    <Outlet/>
    </>,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tickets",
        element: <Ticket />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
