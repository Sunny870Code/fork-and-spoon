import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import AnnouncementBar from "./component/announcement";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { AuthProvider } from "./services/auth.context";

const App = () => {


  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>

  )
}

export default App;