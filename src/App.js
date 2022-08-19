import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import StagesOfLife from "./components/StagesOfLife";
import AllUsers from "./components/AllUsers";
import AddQuotes from "./components/AddQuotes";
import Forums from "./components/Forums";
import Login from "./components/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Navigation />}>
          <Route path="/StagesOfLife" element={<StagesOfLife />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/AddQuotes" element={<AddQuotes />} />
          <Route path="/Forums" element={<Forums />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
