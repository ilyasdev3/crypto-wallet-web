import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/Routes"; // Import the consolidated Routes component

const App = () => {
  return (
    <Router>
      <RoutesComponent />
    </Router>
  );
};

export default App;
