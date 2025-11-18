import React, { useState } from "react";
import Signup from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/Dashboard";
import { createBrowserRouter,RouterProvider } from "react-router-dom";


export default function App(){

  const router = createBrowserRouter([
    {
      path:"/SignUp",
      element:<Signup/>
    },
    {
      path:"/SignIn",
      element:<SignIn/>
    },
    {
      path:"/",
      element:<Dashboard/>
    }

  ])
  

  return(
  <>
  <RouterProvider router={router}>

  </RouterProvider>
  </>
)

}