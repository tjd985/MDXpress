import { Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import { Reset } from "styled-reset";

import Layout from "./Layout";
import Home from "./Home";

function App() {
  return (
    <>
      <Reset />
      <Layout />
      <Routes>
        <Route path="/id/:id/version/:version" element={<Home />} />
        <Route path="/" element={<Navigate to="/id/:id/version/:version" />} />
      </Routes>
    </>
  );
}

export default App;
