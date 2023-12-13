import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Form } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { userAuthentication } from "./hooks/userAuthentication";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import loading from "./assets/loading.gif";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Post from "./pages/Post/Post";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = userAuthentication();

  const loadingUser = user === undefined;

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  
  if (loadingUser) {
      return <div className="container load"><img src={loading} alt="Gif_loading" width="120px" height="120px" /></div>
  }
  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/post/create" element={<CreatePost />}></Route>
              <Route path="/posts/:id" element={<Post />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
