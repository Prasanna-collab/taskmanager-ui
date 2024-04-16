import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AddTask from "./Pages/AddTask";
import ReadTask from "./Pages/ReadTask";
import UpdateTask from "./Pages/UpdateTask"

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="/" element={<Layout/>}>
        <Route path="add" element={<AddTask />} />
        <Route path="tasks" element={<ReadTask />} />
        <Route path="task/:id" element={<UpdateTask/>}/>
      </Route>
       
      </Routes>
    </Router>
  );
};



export default App;
