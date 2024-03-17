import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../Home";
import Header from "../Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/id/:id/version/:version" element={<Home />} />
        <Route path="/" element={<Navigate to="/id/:id/version/:version" />} />
      </Routes>
    </>
  );
}

export default App;
