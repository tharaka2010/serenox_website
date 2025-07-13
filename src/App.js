import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Fotbar } from "./components/Fotbar";

function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin/dashboard');

  return (
    <>
      <Navbar />
      {/* This is where your main application layout and components will go */}
      <Outlet />
      {!hideFooter && <Fotbar />}
    </>
  );
}

export default App;
