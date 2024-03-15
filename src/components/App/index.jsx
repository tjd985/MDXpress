import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "../Layout";
import Home from "../Home";

function App() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/id/:id/version/:version" element={<Home />} />
        <Route path="/" element={<Navigate to="/id/:id/version/:version" />} />
      </Routes>
    </>
  );
}

export default App;
