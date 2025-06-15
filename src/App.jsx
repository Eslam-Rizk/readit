import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router";
import { applyTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";

export default function App() {
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <div className="app-wrapper flex flex-col min-h-screen">
      <section className="flex-1 flex flex-col">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </section>
      <footer className="footer footer-center p-4 bg-base-200 text-base-content mt-8">
        <aside>
          <span>
            &copy; {new Date().getFullYear()} EslamRizk |
            <Link to="/about" className="link link-primary mx-1">
              About
            </Link>
          </span>
        </aside>
      </footer>
    </div>
  );
}
