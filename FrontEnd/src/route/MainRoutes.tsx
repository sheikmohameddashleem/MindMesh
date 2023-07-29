import React from "react";
import { Route, Routes } from "react-router-dom";

// Import your components (assuming you have a component named Welcome)
import Welcome from "../pages/Welcome";
import { Interview } from "../pages/Interview";
import { Score } from "../pages/Score";
// Create the Allroutes component using React.FC
const MainRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Define a Route for each path */}
      <Route path="/" element={<Welcome />} />
      <Route path="/score" element={<Score />} />
      <Route path="/interview/:course" element={<Interview />} />
    </Routes>
  );
};

export default MainRoutes;
