import React from "react";
import NavBar from "./NavBar/NavBar";
import Prompt from "./Prompt/Prompt";
import "../App.css";

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      <Prompt />
    </div>
  );
};

export default App;
