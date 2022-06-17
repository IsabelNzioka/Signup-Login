import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import LoginSuccess from "./components/LoginSuccess/LoginSuccess";
// import { HiMenu } from "react-icons/hi";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/success" element={<LoginSuccess />}></Route>
      </Routes>
    </div>
  );
};

export default App;
