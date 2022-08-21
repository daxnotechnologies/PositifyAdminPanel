import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
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
        <Route path="/" element={<Login />}/>
        <Route path="/Dashboard" element={<Navigation />}>
          <Route path="/Dashboard/StagesOfLife" element={<StagesOfLife />} />
          <Route path="/Dashboard/AllUsers" element={<AllUsers />} />
          <Route path="/Dashboard/AddQuotes" element={<AddQuotes />} />
          <Route path="/Dashboard/Forums" element={<Forums />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
