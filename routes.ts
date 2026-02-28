import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import VehicleEntry from "./pages/vehicleentry";
import VehicleExit from "./pages/vehicleexit";
import SlotManagement from "./pages/slotmanagements";
import Reports from "./pages/reports";
import Layout from "./layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: React.createElement(Login),
  },
  {
    path: "/forgot",
    element: React.createElement(Forgot),
  },
  {
    path: "/reset",
    element: React.createElement(Reset),
  },
  {
    path: "/register",
    element: React.createElement(Register),
  },
  {
    path: "/",
    element: React.createElement(Layout),
    children: [
      { index: true, element: React.createElement(Dashboard) },
      { path: "vehicle-entry", element: React.createElement(VehicleEntry) },
      { path: "vehicle-exit", element: React.createElement(VehicleExit) },
      { path: "slot-management", element: React.createElement(SlotManagement) },
      { path: "reports", element: React.createElement(Reports) },
    ],
  },
]);
